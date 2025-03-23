import { NextResponse, NextRequest } from "next/server";
import Contribution from "@/models/contribution";
import Penalty from "@/models/penalty";
import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

export async function POST(request: NextRequest) {
    await connect();

    try {
        const { userId, amount, contributionId, reason } = await request.json();

        const [contribution, user] = await Promise.all([
            Contribution.findById(contributionId),
            User.findById(userId)
        ]);

        if (!contribution || !user || contribution.user.toString() !== userId) {
            console.log("Invalid contribution or user");
            return NextResponse.json({ message: "Invalid contribution or user" }, { status: 400 });
        }

        // Create and save the penalty
        const penalty = await new Penalty({ user: userId, amount, reason }).save();

        // Update the contribution directly in the database
        await Contribution.findByIdAndUpdate(
            contributionId,
            { $push: { penalties: penalty._id } },
            { new: true }
        );

        return NextResponse.json({ message: "Penalty created successfully" }, { status: 201 });

    } catch (error) {
        console.error("Error creating penalty:", error);
        return NextResponse.json({ message: "Server error", error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
}
