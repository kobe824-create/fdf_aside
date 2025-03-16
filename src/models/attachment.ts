import mongoose from "mongoose";

const attachmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    meeting: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Meeting",
        required: true
    },
}, { timestamps: true });


const Attachment = mongoose.models.Attachment || mongoose.model("Attachment", attachmentSchema);
export default Attachment;