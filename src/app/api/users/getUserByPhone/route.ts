import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import connect from "@/dbConfig/dbConfig";



export async function POST(request: NextRequest) {
    await connect();
    try {
        const reqBody = await request.json();
        let {phoneNumber} = reqBody;

        if (phoneNumber.includes("+")) {
            phoneNumber = phoneNumber.replace("+", "");
        }

        const user = await User.findOne({phoneNumber}).populate("otp");
        if(!user) {
            return NextResponse.json({message: "user not found"}, {status: 404})
        }
        return NextResponse.json({ user });

    } catch (error) {
        return NextResponse.json({ message: "server error", error }, { status: 500 });
    }
}

