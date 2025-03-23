import { NextResponse } from "next/server";
import Penalty from "@/models/penalty";
import connect from "@/dbConfig/dbConfig";



export async function GET() {
    await connect();
    try {
        const penalties = await Penalty.find();
        return NextResponse.json(penalties);
    } catch (error: unknown) {
        console.error(error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json(
            { message: "server error", error: errorMessage },
            { status: 500 }
        );
    } 
}