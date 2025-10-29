import mongoose, { Schema, Document, Model } from "mongoose";
import validator from "validator";
import { Event } from "./event.model";

export interface IBooking extends Document {
  eventId: mongoose.Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => validator.isEmail(v),
        message: "Invalid email format.",
      },
    },
  },
  { timestamps: true }
);

// Pre-save hook to validate event reference and email
BookingSchema.pre<IBooking>("save", async function (next) {
  // Check event existence
  const eventExists = await Event.exists({ _id: this.eventId });
  if (!eventExists) {
    return next(new Error("Referenced event does not exist."));
  }

  // Ensure valid email
  if (!validator.isEmail(this.email)) {
    return next(new Error("Invalid email address."));
  }

  next();
});

export const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);
