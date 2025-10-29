import mongoose, { Schema, Document, Model } from "mongoose";
import slugify from "slugify";

export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: "online" | "offline" | "hybrid";
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    description: { type: String, required: true },
    overview: { type: String, required: true },
    image: { type: String, required: true },
    venue: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    mode: {
      type: String,
      required: true,
      enum: ["online", "offline", "hybrid"],
    },
    audience: { type: String, required: true },
    agenda: { type: [String], required: true },
    organizer: { type: String, required: true },
    tags: { type: [String], required: true },
  },
  { timestamps: true }
);

// Pre-save hook for slug generation, date normalization, and validation
EventSchema.pre<IEvent>("save", function (next) {
  // Generate slug only if title changed
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  // Validate required fields are not empty
  const requiredFields: (keyof IEvent)[] = [
    "title",
    "description",
    "overview",
    "image",
    "venue",
    "location",
    "date",
    "time",
    "mode",
    "audience",
    "agenda",
    "organizer",
    "tags",
  ];

  for (const field of requiredFields) {
    if (!this[field] || (Array.isArray(this[field]) && this[field].length === 0)) {
      return next(new Error(`Field "${field}" is required and cannot be empty.`));
    }
  }

  // Normalize date to ISO format
  const parsedDate = new Date(this.date);
  if (isNaN(parsedDate.getTime())) {
    return next(new Error("Invalid date format."));
  }
  this.date = parsedDate.toISOString();

  // Normalize time (HH:MM 24-hour format)
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (!timeRegex.test(this.time)) {
    return next(new Error("Invalid time format. Use HH:MM in 24-hour format."));
  }

  next();
});

export const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);
