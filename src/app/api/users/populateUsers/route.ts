import { NextResponse } from "next/server";
import User from "@/models/userModel";
import connect from "@/dbConfig/dbConfig";
import bcrypt from "bcryptjs";

export async function GET() {
    await connect();
    try {
        const users = await User.find({});

        // Use map with Promise.all to properly hash passwords and update users
        await Promise.all(
            users.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.phoneNumber.toString(), 10);
                await User.updateOne({ _id: user._id }, { password: hashedPassword });
            })
        );

        const updatedUsers = await User.find({}); // Fetch updateds users

        return NextResponse.json({ users: updatedUsers });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Failed to update users", error: error.message },
            { status: 500 }
        );
    }
}


