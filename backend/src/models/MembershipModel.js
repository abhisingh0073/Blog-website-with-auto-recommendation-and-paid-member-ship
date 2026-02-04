import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    expiresAt: {
        type: Date,
        required: true,
    },
}, {timestamps: true});


membershipSchema.index({expiresAt: 1}, {expireAfterSeconds: 0});



export default mongoose.model("Membership", membershipSchema);