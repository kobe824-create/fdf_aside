import { NextResponse, NextRequest } from "next/server";
import Meeting from "@/models/meeting";
import connect from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
   
    try {
        const reqBody = await request.json();
        const {meetingId} = reqBody;

        const meeting = await Meeting.findOne({_id: meetingId}).populate("activities").populate("attachments")
        .populate({
            path: "attendances",  
            populate: {
                path: "user",
                model: "User"
            }
        });    
        
        if (!meeting) {
            return NextResponse.json({ message: "Meeting doesn't exist" }, { status: 400 });
        }
        return NextResponse.json({ meeting }, { status: 200 });


    } catch (error) {
        console.log("error", error)
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}