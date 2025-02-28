import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    profilePic: {
      type: String, // Store URL of the profile picture
    },
    skills: {
      type: [String], // Array of skills
    },
    socialLinks: {
      linkedin: { type: String, trim: true },
      github: { type: String, trim: true },
      website: { type: String, trim: true },
    },
    achievements: [
      {
        title: String,
        description: String,
        date: Date,
      },
    ],
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post", // Refers to the Post model
      },
    ],
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
