import { NextResponse, NextRequest } from "next/server";
import Contribution from "@/models/contribution";
import connect from "@/dbConfig/dbConfig";

export async function POST(request: NextRequest) {
    await connect();

    try {
        const reqBody = await request.json();
        const { userId, amount } = reqBody;
        let { year, month } = reqBody;

        console.log("Received Year:", year, "Received Month:", month);

        // Ensure year and month are present
        if (!year || !month) {
            console.log("Missing year or month");
            return NextResponse.json({ message: "Year and month are required" }, { status: 400 });
        }

        // Convert to numbers
        year = Number(year);
        month = Number(month);

        // Validate conversion
        if (isNaN(year) || isNaN(month)) {
            console.log("Invalid year or month format (NaN)");
            return NextResponse.json({ message: "Invalid year or month format" }, { status: 400 });
        }

        // Validate range
        if (month < 1 || month > 12) {
            console.log("Month out of range");
            return NextResponse.json({ message: "Month must be between 1 and 12" }, { status: 400 });
        }

        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 1);

        console.log("Checking Contributions for Dates:", startDate, endDate);

        const contribution = await Contribution.findOne({
            user: userId,
            date: { $gte: startDate, $lt: endDate }
        });

        if (contribution) {
            console.log("Contribution already exists");
            return NextResponse.json({ message: "Contribution already exists" }, { status: 400 });
        }

        const newContribution = new Contribution({
            user: userId,
            amount,
            date: startDate // Store the date for reference
        });

        await newContribution.save();
        return NextResponse.json({ message: "Contribution created successfully" }, { status: 201 });

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}
