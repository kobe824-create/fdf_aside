import { NextResponse, NextRequest } from "next/server";
import Attachment from "@/models/attachment";
import Meeting from "@/models/meeting";
import activity from "@/models/activity";
import connect from "@/dbConfig/dbConfig";

import fs, { writeFile } from "fs/promises";
import path from "path";



export async function POST(request: NextRequest) {
    await connect();
    try {
        const reqBody = await request.formData();
        const id = reqBody.get('id') as string;
        const files = reqBody.getAll('files') as File[];

        const meeting = await Meeting.findOne({ _id: id });

        if (!meeting) {
            return NextResponse.json({ message: "Meeting doesn't exist" }, { status: 400 });
        }

        // Process all files in parallel and wait for all of them to finish
        const attachments = await Promise.all(
            files.map(async (file) => {
          
                const bytes = await file.arrayBuffer();
                const buffer = Buffer.from(bytes);
                const modifiedFileName = `${Date.now()}_${file.name}`;
                const imgPath = `public/images/attachments/${modifiedFileName}`;

                await writeFile(imgPath, buffer);

                const newAttachment = new Attachment({
                    name: file.name,
                    url: `/images/attachments/${modifiedFileName}`,
                    meeting: id,
                    size: file.size,
                });

                await newAttachment.save();
                return newAttachment._id; // Collect attachment IDs
            })
        );

        // Attach all new file IDs to the meeting and save
        meeting.attachments.push(...attachments);

        const newActivity = new activity({
            title: "Attachment Added",
            author: "Admin",
            description: `added attachments to the meeting`,
            meeting: id,
        });
        await newActivity.save();

        meeting.activities.push(newActivity._id);

        await meeting.save();

        return NextResponse.json({ message: "Attachments created successfully" }, { status: 201 });
    } catch (error) {
        console.log("error", error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}
