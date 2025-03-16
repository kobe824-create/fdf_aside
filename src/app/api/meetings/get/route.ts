import { NextResponse } from "next/server";
import Meeting from "@/models/meeting";
import connect from "@/dbConfig/dbConfig";

export async function GET() {
    await connect();
    try {

        const meetings = await Meeting.find();
        return NextResponse.json({ meetings }, { status: 200 });


    } catch (error) {
        console.log("error", error)
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}