import mongoose from "mongoose";

const contributionSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    penalties: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Penalty",
        },
    ],
    status: {
        type: String,
        enum: ["paid", "unpaid"],
        default: "unpaid"
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Contribution = mongoose.models.Contribution || mongoose.model("Contribution", contributionSchema);
export default Contribution;