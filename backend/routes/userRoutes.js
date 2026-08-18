const express = require("express");
const router = express.Router();
const { getMe } = require("../controllers/userController");

// All /api/users routes are intended to be protected by `protect` at mount-time

// GET /api/users/me
router.get("/me", getMe);

module.exports = router;

