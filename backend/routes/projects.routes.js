import express from "express";
import multer from "multer";
import {
  createProject,
  getProjects,
} from "../controllers/projects.controllers.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/projects/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/create", upload.array("media"), createProject);
router.get("/getProjects", getProjects);

export default router;
