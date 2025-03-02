import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import postsRoutes from "./routes/posts.routes.js";
import userRoutes from "./routes/users.routes.js";

dotenv.config();

const app = express();
app.use(cors()); // user doesn't allow exception

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/posts", postsRoutes);

const start = async () => {
  const connectDB = await mongoose.connect(
    "mongodb+srv://sannidhya:Sannidhya0501@campuscatalyst.rt26u.mongodb.net/?retryWrites=true&w=majority&appName=CampusCatalyst"
  );

  app.listen(9080, () => {
    console.log("Server is running on port 9080");
  });
};
start();
