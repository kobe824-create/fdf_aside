import { NextResponse } from "next/server";
import User from "@/models/userModel";
import connect from "@/dbConfig/dbConfig";



export async function GET() {
    await connect();
    try {
        const admin = await User.findOneAndUpdate(
            { role: "admin" },
            { $set: { phoneNumber: 788200633 } },
        );
        if (!admin) {
            return NextResponse.json({ message: "No users admin found" }, { status: 404 });
        }
        const peter = await User.findOneAndUpdate(
            { firstname: "KAGABE" },
            { $set: { phoneNumber: 788525736 } },
        );
        if (!peter) {
            return NextResponse.json({ message: "No users peter found" }, { status: 404 });
        }
        return NextResponse.json({ peter }, { status: 200 });


    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Failed to create user", error }, { status: 500 });
    }
}





