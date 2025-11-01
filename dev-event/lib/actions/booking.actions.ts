"use server";
import { Booking } from "@/app/database";
import connectToDatabase from "../mongodb";

export const createBooking = async ({eventId, slug, email} :{eventId: string, slug: string, email : string}) => {
try {

    await connectToDatabase();
    await Booking.create({eventId, slug, email});
    return { success: true };
} catch (e) {
    console.log("Create Booking Failed", e);
    return { success: false};
}
}