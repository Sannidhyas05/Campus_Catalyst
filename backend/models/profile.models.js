

import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    course: {
      type: String,
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const experienceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

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
    profilePicture: {
      type: String,
      default: "",
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
    FieldOfStudy: [educationSchema],
    WorkExperience: [experienceSchema],
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
