import { randomUUID } from "crypto";
import mongoose from "mongoose";


const attendanceSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    meeting: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Meeting",
        required: true
    },
    checkIn: {
        type: Date,
    },
    key: {
        type: String,  // Store UUID as a string
        default: () => randomUUID(),  // Generate UUID automatically
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ["present", "absent", "absent excused", "late", "very late", "excused" ],
        default: "absent"
    }
}, { timestamps: true });

const Attendance = mongoose.models.Attendance || mongoose.model("Attendance", attendanceSchema);
export default Attendance;
