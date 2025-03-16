import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    meeting: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Meeting",
        required: true
    },
}, { timestamps: true });


const Activity = mongoose.models.Activity || mongoose.model("Activity", ActivitySchema);
export default Activity;