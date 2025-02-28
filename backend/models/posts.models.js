import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    media: [
      {
        url: String,
        type: {
          type: String,
          enum: ["image", "video", "document"],
        },
      },
    ],
    likes: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    shares: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        sharedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    projectDetails: {
      title: String,
      teamMembers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      mentorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      progress: {
        type: String,
        enum: ["Planning", "In Progress", "Completed"],
        default: "Planning",
      },
    },
    tags: [String], // Keywords or hashtags
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
