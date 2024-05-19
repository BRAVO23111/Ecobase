import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  firstName: { type: String },
  lastName: { type: String },
  bio: { type: String },
  environmentalInterests: { type: [String] },
});

export const ProfileModel = mongoose.model("Profile", ProfileSchema);
