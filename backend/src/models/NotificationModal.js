import mongoose from "mongoose";
import refunds from "razorpay/dist/types/refunds";

const notificationSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },

    type:{
        type: String,
        enum: ["follow", "title", "comment", "membership", "post"],
        required: true,
    },

    message: {
        type: String,
        required: true,
    },

    link: {
        type: String,
    },

    isRead: {
        type: Boolean,
        default: false,
        index: true,
    },

    fromUser : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, {timestamps: true});



export default mongoose.model("Notification", notificationSchema);