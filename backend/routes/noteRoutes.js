const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { upload } = require("../middleware/uploadMiddleware");
const { uploadNote, getNotes, getNoteById } = require("../controllers/noteController");

// GET /api/notes — public list for Browse
router.get("/", getNotes);

// POST /api/notes/upload — authenticated multipart upload (before /:id)
router.post("/upload", protect, upload.single("file"), uploadNote);

// GET /api/notes/:id
router.get("/:id", getNoteById);

module.exports = router;
