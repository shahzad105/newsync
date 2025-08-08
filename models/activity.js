import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    type: {
      type: String, // e.g., "profile", "security", "verification"
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Activity =
  mongoose.models?.Activity || mongoose.model("Activity", activitySchema);
export default Activity;
