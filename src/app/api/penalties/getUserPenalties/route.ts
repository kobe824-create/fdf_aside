import { NextResponse, NextRequest } from "next/server";
import Penalty from "@/models/penalty";
import connect from "@/dbConfig/dbConfig";



export async function POST(request: NextRequest) {
 
    try {
        await connect();
        const reqBody = await request.json();
        const { id } = reqBody;
        const penalties = await Penalty.find({ user: id });
    
        return NextResponse.json({ penalties }, { status: 200 });

    } catch (error: unknown) {
        console.error(error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json(
            { message: "server error", error: errorMessage },
            { status: 500 }
        );
    } 
}