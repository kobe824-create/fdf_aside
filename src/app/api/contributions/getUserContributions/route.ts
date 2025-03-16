import { NextResponse, NextRequest } from "next/server";
import Contribution from "@/models/contribution";
import connect from "@/dbConfig/dbConfig";

export async function POST(request: NextRequest) {
    await connect();
    try {
        const reqBody = await request.json();

        const {id } = reqBody;
        const contributions = await Contribution.find({ user: id });
        return NextResponse.json({ contributions }, { status: 200 });


    } catch (error) {
        console.log("error", error)
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}