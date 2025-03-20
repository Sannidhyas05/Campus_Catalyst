import express from "express";
import multer from "multer";
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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.get("/", activeCheck);
router.post("/create", upload.single("media"), createPost);
router.post("/like", likePost);
router.post("/comment", commentPost);
router.post("/share", sharePost);
router.get("/getPosts", getPosts);
router.post("/delete", deletePost);

export default router;
