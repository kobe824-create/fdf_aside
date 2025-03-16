import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import connect from "@/dbConfig/dbConfig";



export async function POST(request: NextRequest) {
    await connect();
    try {
        const reqBody = await request.json();
        const {phoneNumber} = reqBody;


        const user = await User.findOne({phoneNumber});
        if(!user) {
            return NextResponse.json({message: "user not found"}, {status: 404})
        }
        return NextResponse.json({ user });

    } catch (error) {
        return NextResponse.json({ message: "server error", error }, { status: 500 });
    }
}

