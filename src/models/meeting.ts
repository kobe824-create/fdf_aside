import mongoose from "mongoose";

import Activity from "@/models/activity";
import Attachment from "@/models/attachment";
import Attendance from "@/models/attendance";
import User from "@/models/userModel";

const meetingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: "Monthly meeting"
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
        default: new mongoose.Types.ObjectId("67c41f56f03c80a025fd4af2"),
    },
    activities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Activity,
        },
    ],
    attachments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Attachment,
        },
    ],
    attendances: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Attendance,
        },
    ],
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    }
}, { timestamps: true });

const Meeting = mongoose.models.Meeting || mongoose.model("Meeting", meetingSchema);
export default Meeting;