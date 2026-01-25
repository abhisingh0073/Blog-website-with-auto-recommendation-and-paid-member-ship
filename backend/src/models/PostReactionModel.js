import mongoose from "mongoose";

const postReactionSchema = new mongoose.Schema({

    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    reaction: {
        type: String,
        enum: ["like", "dislike"],
        required: true,
    },
}, {timestamps: true} );


postReactionSchema.index({ post: 1, user: 1}, {unique: true });

export default mongoose.model("PostReaction", postReactionSchema);