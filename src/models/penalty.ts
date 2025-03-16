import mongoose from "mongoose";

const penaltySchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        enum: ["contribution", "meeting", "other"],
        default: "other"
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Penalty = mongoose.models.Penalty || mongoose.model("Penalty", penaltySchema);
export default Penalty;