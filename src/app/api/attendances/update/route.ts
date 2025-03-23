import { NextResponse, NextRequest } from "next/server";
import Attendance from "@/models/attendance";
import connect from "@/dbConfig/dbConfig";

export async function POST(request: NextRequest) {
    try {
        await connect();
        const reqBody = await request.json();
        const { attendanceId, status } = reqBody;

        const attendance = await Attendance.findOne({_id: attendanceId}); 
        if (!attendance) {
            return NextResponse.json({ message: "Attendance doesn't exist" }, { status: 400 });
        }
        attendance.status = status;

        if (status !== "absent") {
            attendance.checkIn = new Date();
        } else {
            attendance.checkIn = null
        }

        await attendance.save();
        return NextResponse.json({ message: "Attendance updated successfully" }, { status: 200 });

    } catch (error) {
        console.log("error", error);
        return NextResponse.json({ message: "Server Error" }, { status:
            500 });
    }
}