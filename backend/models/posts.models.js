import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postType: {
      type: String,
      enum: ["content", "project"],
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: function () {
        return this.postType === "content";
      },
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
      title: {
        type: String,
        required: function () {
          return this.postType === "project";
        },
      },
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
    tags: [String],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
