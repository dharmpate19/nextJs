Setting Up next.Js Project.
-Downloaded light Rays Component and upadted it according to the needs.
-By defult every function is a server component so here page is server component and we want to make button interactive from client side so we have to make button client component thus we created button a client component by using "use client".
-Whenever you see something in every page you add them in layout like navbar


--Database COnnection(How Dababase function is created and cahed is use to retrive same connected data instead of creaeting new connection)

Basically, global.mongoose acts as a reference that stores and remembers the cached MongoDB connection.

When the code first runs, we define a local cached object with both conn and promise set to null. Then, we assign this object to global.mongoose, so it can be reused later — even if the app reloads or the function runs again.

Once the connectToDatabase() function executes for the first time, it establishes a MongoDB connection. At that point, both conn and promise inside the cache get updated with the active connection and the connection promise.

Later, when the function runs again, even though a new cached variable is declared, it simply references the same global.mongoose object. This means it still has the previously stored connection data (conn and promise).

As a result, instead of creating a new MongoDB connection each time, the function detects that cached.conn already exists and reuses the same active connection — ensuring better performance and avoiding duplicate connections.

After establishing the connection, we attach Mongoose event listeners to keep track of the connection state — whether it’s connected, has an error, or gets disconnected.


--Model

-We created model for Events and booking we defind types of all and also we use pre defind hok sto validate value.
-we use generic while definingtypeso that we can export that schema using model.


--API Route

-We use formData to get data from user
-This API route handles a POST request in Next.js to create a new event.
It first connects to MongoDB, then retrieves the submitted form data using req.formData().
The form data is converted into a plain JavaScript object with Object.fromEntries() so it can be easily processed.
Using the Event Mongoose model, the data is saved to the database. We import Event then use let createdEvent = await Event.create(event)
If the operation succeeds, a success message and the created event are returned in JSON format Using NextResponse.josn({message : 'message', events : createdEvent}, {status : 201}).
If an error occurs, it’s caught and returned with an appropriate status code and message.

--Buffer for Uploading Image in Next.js()
The basic logic is that when we upload an image in JavaScript, the image is stored in binary form. To access this binary data, we use await file.arrayBuffer(), which converts the image into a binary format. However, Next.js (which runs on Node.js) doesn’t directly work with ArrayBuffer; instead, it uses its own Buffer type. Therefore, we create a Node.js buffer using Buffer.from(arrayBuffer). This converts the image into a format that Next.js can understand and process as binary data.

--Cloudinary
-We have used cloudinary to upload the image to the server
-After that we added cloudinary URI
-In the next.config.ts file, I configured the images property and added a remotePatterns array. This allows Next.js to securely load and optimize images hosted on external sources such as Cloudinary.
-Within the remotePatterns array, I defined an object specifying the protocol and hostname. This tells Next.js which external domains are trusted for serving images. For example, by setting protocol: "https" and hostname: "res.cloudinary.com", I enabled Next.js to fetch and display images stored on Cloudinary using the next/image component without security or optimization issues.

-Function to upload image to cloudinary
we created function uploadresult that return pormise and for this we have imported library cloudinary and imported v2 as cloudinary and inside function we do cloudinary.uploader.upload_stream in that we pass object resource type that is image and folder name then we call the call back function that reutrn resolve if everything is resolved or reject if it has error finally we end this function by sending binary.
