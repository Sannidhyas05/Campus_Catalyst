import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

import {
  createPost,
  activeCheck,
  likePost,
  commentPost,
  sharePost,
  getPosts,
  deletePost,
} from "../controllers/posts.controller.js";

const router = express.Router();

router.get("/", activeCheck);
router.post("/create", upload.single("media"), createPost);
router.post("/like", likePost);
router.post("/comment", commentPost);
router.post("/share", sharePost);
router.get("/getPosts", getPosts);
router.post("/delete", deletePost);

export default router;
