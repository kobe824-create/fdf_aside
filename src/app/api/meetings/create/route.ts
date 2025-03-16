import { NextResponse, NextRequest } from "next/server";
import Meeting from "@/models/meeting";
import activity from "@/models/activity";
import User from "@/models/userModel";
import Attendance from "@/models/attendance";
import connect from "@/dbConfig/dbConfig";

export async function POST(request: NextRequest) {
    await connect();
    try {
        const reqBody = await request.json();
        const { title, date, description, location, startTime, endTime } = reqBody;

        const newMeeting = new Meeting({
            title,
            date,
            description,
            location,
            startTime,
            endTime
        });

        const activity1 = new activity({
            title: "Meeting created",
            author: "Admin",
            description: "created a meeting",
            meeting: newMeeting._id,
        });
        newMeeting.activities.push(activity1._id);
        
        await activity1.save();



        const users = await User.find();

        const attendances = await Promise.all(
            users.map(async (user) => {
                const attendance = new Attendance({
                    user: user._id,
                    meeting: newMeeting._id,
                    status: "absent"
                });
                await attendance.save();
                return attendance._id;
            })
        );

        newMeeting.attendances.push(...attendances);

        await newMeeting.save();
        return NextResponse.json({ message: "Meeting created successfully" }, { status: 201 });


    } catch (error) {
        console.log("error", error)
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}