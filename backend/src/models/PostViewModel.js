import mongoose from "mongoose";

const postViewSchema = new mongoose.Schema({

    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },

    sessionId: {
        type: String,
        default: null,
    }
}, { timestamps: true });

postViewSchema.index({post: 1, user: 1}, {unique: true, sparse: true });

export default mongoose.model("PostView", postViewSchema);