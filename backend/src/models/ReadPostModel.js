import mongoose from "mongoose";

const readPostSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },

    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },

    completed:{
        type: Boolean,
        default: false,
    },

    lastReadAt: {
        type: Date,
        default: Date.now,
    },
}, {timestamps: true});


readPostSchema.index({user: 1, post: 1}, { unique : true});

export default mongoose.model("ReadPost", readPostSchema);