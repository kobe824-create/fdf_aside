import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    monthlyContributionAmount: {
        type: Number,
        default: 0,
    },
    email: {
        type: String,
    },
    role: {
        type: String,
        enum: ["member", "accountant", "admin"],
        default: "member",
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        enum
        : ["male", "female"],
        required: true,
    },
    identification: {
        type: Number,
        default: 0,
    },
    image_url: {
        type: String,
        default: "images/profilePic/unknown.png",
    },
    notifications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Notification",
        },
    ],
    otp: {
        type: String,
        ref: "Otp",
    },
    password: {
        type: String,
    },
},{ timestamps: true });

const User = mongoose.models?.User || mongoose.model("User", userSchema);
export default User;
