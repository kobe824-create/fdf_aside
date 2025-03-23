import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import connect from "@/dbConfig/dbConfig";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";


export async function POST(request: NextRequest) {
    await connect();
    try {
        const reqBody = await request.json()

        const { password, rememberMe } = reqBody
        let {phoneNumber } = reqBody

        if (phoneNumber.includes("+")) {
            phoneNumber = phoneNumber.replace("+", "")
        }
        console.log(phoneNumber, password)
        const user = await User.findOne({
            phoneNumber
        })
        if (!user) {
            return NextResponse.json({ message: "Invalid phone number or password" }, { status: 401 })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return NextResponse.json({ message: "Invalid phone number or password" }, { status: 401 })
        }
        const cachedUser = { phoneNumber, id: user._id };
        const cookieStore = await cookies();
        if (rememberMe) {
            cookieStore.set("session", JSON.stringify(cachedUser), { httpOnly: true, maxAge: 60 * 60 * 24 * 7 });
        } else {
            cookieStore.set("session", JSON.stringify(cachedUser), { httpOnly: true });
        }
        return NextResponse.json({ message: "Logged in", user });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "server error", error: error.message },
            { status: 500 }
        );
    }
}
