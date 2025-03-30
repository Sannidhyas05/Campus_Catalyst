import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import postsRoutes from "./routes/posts.routes.js";
import userRoutes from "./routes/users.routes.js";
import projectRoutes from "./routes/projects.routes.js";
import path from "path";

dotenv.config();

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

app.use("/api/users", userRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/projects", projectRoutes);

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sannidhya:Sannidhya0501@campuscatalyst.rt26u.mongodb.net/campus_catalyst?retryWrites=true&w=majority&appName=CampusCatalyst"
    );
    console.log("Connected to MongoDB successfully!");

    app.listen(9080, () => {
      console.log("Server is running on port 9080");
    });
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};
start();
