import mongoose from 'mongoose';

// Define the structure for the global mongoose cache
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend the global object to include our mongoose cache
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

// Get MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;


/**
 * Global cache to store the mongoose connection
 * This prevents creating multiple connections during development hot reloads
 * In production, this cache is not needed but doesn't hurt
 */
let cached: MongooseCache = global.mongoose || {
  conn: null,
  promise: null,
};

// Store the cache in global object to persist across hot reloads
if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Establishes a connection to MongoDB using Mongoose
 * Implements connection caching to reuse existing connections
 * 
 * @returns Promise that resolves to the mongoose instance
 */
async function connectToDatabase(): Promise<typeof mongoose> {
  // If connection already exists, return it
  if (cached.conn) {
    console.log('Using cached MongoDB connection');
    return cached.conn;
  }

  // If connection promise doesn't exist, create a new connection
  if (!cached.promise) {

    // Validate that MongoDB URI is provided
if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}
    const options = {
      bufferCommands: false, // Disable mongoose buffering
      maxPoolSize: 10, // Maximum number of connections in the pool
      minPoolSize: 2, // Minimum number of connections in the pool
      serverSelectionTimeoutMS: 5000, // Timeout for server selection
      socketTimeoutMS: 45000, // Timeout for socket inactivity
    };

    console.log('Creating new MongoDB connection...');
    
    // Create the connection promise
    cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
      console.log('MongoDB connected successfully');
      return mongoose;
    });
  }

  try {
    // Wait for the connection to be established
    cached.conn = await cached.promise;
  } catch (error) {
    // If connection fails, reset the promise to allow retry
    cached.promise = null;
    console.error('MongoDB connection error:', error);
    throw error;
  }

  return cached.conn;
}

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (error) => {
  console.error('Mongoose connection error:', error);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
});

// Graceful shutdown
if (process.env.NODE_ENV !== 'production') {
  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Mongoose connection closed due to application termination');
    process.exit(0);
  });
}

export default connectToDatabase;
