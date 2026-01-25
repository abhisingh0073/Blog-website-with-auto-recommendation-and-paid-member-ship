import mongoose from "mongoose";
const { Schema, model} = mongoose;

const userSchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        
    },

    avatar: {
        type: String,
        default: "default.png",
    },

    bio: {
        type: String,
        maxLength: 200,
    },



//google auth2.0 data
    googleId: {
        type: String,
    },
    authProvider: {
        type: String,
        enum: ["local", "google"],
        default: "local",
    },


    interests: [
        {
            tag:{
                type: String,
                lowercase: true,
                trim: true,
            },
            score: {
                type: Number,
                default: 1,
            },
        }
    ],

    memberships: [
        {
            creator: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
            expiresAt: Date,
        },
    ],

    totalPosts: {
        type: Number,
        default: 0,
    },

    totalViews: {
        type: Number,
        default: 0,
    },
    
}, { timestamps: true } )

export default model("User", userSchema);