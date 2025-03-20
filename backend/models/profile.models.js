import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
        default: [],
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
        default: [],
      },
    ],
    bio: {
      type: String,
      trim: true,
    },
    profilePic: {
      type: String,
    },
    skills: {
      type: [String],
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
        title: String,
        description: String,
        date: Date,
        link: String,
      },
    ],
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
