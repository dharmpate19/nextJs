import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import {v2 as cloudinary} from 'cloudinary';
import {Event} from './../../database/event.model'

export async function POST(req: NextRequest){
    try {
        await connectToDatabase();
        
        const formData = await req.formData();

        let event;

        try {
            event = Object.fromEntries(formData.entries())
        } catch (e) {
            return NextResponse.json({message : "Inavlid data format error", error : e instanceof Error ? e.message : "Unknown"}, {status : 400})
        }

        const file = formData.get('image') as File;

        if(!file) {
            return NextResponse.json({message : "Image file is required"}, {status : 400})
        }

        const tags = JSON.parse(formData.get('tags') as string)
        const agenda = JSON.parse(formData.get('agenda') as string)

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer)

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({resource_type : 'image', folder : 'Dev Event'}, (error, result) => {
                if(error) return reject(error);
                resolve(result)
            }).end(buffer)
        })

        event.image = (uploadResult as {secure_url : string}).secure_url;

        const createdEvent = await Event.create({
            ...event,
            tags: tags,
            agenda: agenda
        });
        return NextResponse.json({message : "Event Created Successfully", event : createdEvent}, {status : 201})

    } catch (e) {
        console.log(e);
        return NextResponse.json({message : "Event creation failed", error : e instanceof Error ? e.message : "Unknown"},{status : 500})
    }
}

export async function GET(){
    try {

        await connectToDatabase();

        const events = await Event.find().sort({createdAt : -1})
        return NextResponse.json({message : 'Event Fetched Successfully', events}, {status : 200})
        
    } catch (e) {
        return NextResponse.json({message : 'Event Fetching failed', error : e}, {status : 500})
    }
}