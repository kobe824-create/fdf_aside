import mongoose from "mongoose"

const otpSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    isUsed: {
        type: Boolean,
        default: false,
    },
    expiry: {
        type: Date,
        default: () => new Date(Date.now() + 60000 * 5),
    }
},{ timestamps: true });

const Otp = mongoose.models?.Otp || mongoose.model("Otp", otpSchema);
export default Otp;