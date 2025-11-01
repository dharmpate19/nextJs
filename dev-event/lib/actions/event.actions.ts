'use server';

import { Event } from "@/app/database";
import connectToDatabase from "../mongodb";

export const getSimilarEventBySlug =async (rawSlug: string) => {
    
    
      // Basic validation: presence and type
      if (!rawSlug || typeof rawSlug !== "string" || rawSlug.trim().length === 0) {
        return null;
      }
    
      // Decode and normalize slug
      const slug = decodeURIComponent(rawSlug).trim().toLowerCase();
    
try {
    await connectToDatabase();
    const event = await Event.findOne({slug}).lean().exec();
    return await Event.find({_id : {$ne : event?._id}, tags : {$in : event?.tags}}).lean().exec();
} catch (error) {
    return[];
}
}