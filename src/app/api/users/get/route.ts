import { NextResponse } from "next/server";
import User from "@/models/userModel";
import connect from "@/dbConfig/dbConfig";



export async function GET() {
    await connect();
    try {
        const users = await User.find();
        return NextResponse.json({ users });

    } catch (error) {
        return NextResponse.json({ message: "server error", error }, { status: 500 });
    }
}

