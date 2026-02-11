import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // receiver
      ref: "User",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId, // who triggered it
      ref: "User",
    },
    type: {
      type: String, // "follow", "like", "comment", "membership"
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    link: {
      type: String, // where to redirect on click
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
