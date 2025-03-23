import { NextResponse} from "next/server";
import Attachment from "@/models/attachment";
import connect from "@/dbConfig/dbConfig";




export async function GET() {
    try {
        await connect();
        const attachments = await Attachment.find();
        return NextResponse.json({ attachments }, { status: 200 });

    } catch (error) {
        console.log("error", error)
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}