
import { NextResponse, NextRequest } from "next/server";
import Meeting from "@/models/meeting";
import connect from "@/dbConfig/dbConfig";
import Attendance from "@/models/attendance";
import Activity from "@/models/activity";
import Attachment from "@/models/attachment";

connect();

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json();
        const { meetingId } = reqBody;

        const meeting = await Meeting.findOne({ _id: meetingId })

        if (!meeting) {
            return NextResponse.json({ message: "Meeting doesn't exist" }, { status: 400 });
        }

        await Attendance.deleteMany({ meeting: meetingId });
        await Activity.deleteMany({ meeting: meetingId });
        await Attachment.deleteMany({ meeting: meetingId });
        await Meeting.findOneAndDelete({ _id: meetingId });
        return NextResponse.json({ message: "Meeting deleted successfully" }, { status: 200 });

    } catch (error) {
        console.log("error", error)
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}