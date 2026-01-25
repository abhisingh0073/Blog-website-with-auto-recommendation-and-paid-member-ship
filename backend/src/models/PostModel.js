import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 150,
    },

    slug: {
        type: String,
        lowercase: true,
    },

    content: {
        type: String,
        required: true,
    },

    excerpt: {
        type: String,
        maxLength: 300,
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    tags: {
        type: [String],
        index: true,
    },

    category: {
        type: String,
        index: true,
    },

    language: {
        type: String,
        defalt: "en"
    },

    status:{
        type: String,
        enum: ["private", "public", "unlisted"],
        default: "private",
        index: true,
    },

    isMembersOnly: {
        type: Boolean,
        default: false,
    },

    coverImage: {
        type: String,
        default: "defaultPost.png",
    },

    views: {
        type: Number, 
        default: 0,
        index: true,
    },

    likesCount:{
        type: Number,
        default: 0,
    },

    dislikesCount: {
        type: Number,
        default: 0,
    },

    readingTime: {
        type: Number,
    },

    popularity: {
        type: Number,
        default: 0,
        index: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    publishedAt: {
      type: Date,
    },
}, {timestamps: true });

export default mongoose.model("Post", postSchema, "posts");