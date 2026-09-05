const express = require("express");
const router = express.Router();
const { getMe, updateProfile } = require("../controllers/userController");
const {
    updateProfileValidationRules,
    validateRequest,
} = require("../middleware/validationMiddleware");

// All /api/users routes are protected by `protect` at mount-time in server.js

// GET /api/users/me
router.get("/me", getMe);

// PUT /api/users/profile
router.put("/profile", updateProfileValidationRules, validateRequest, updateProfile);

// PUT /api/users/me (alias)
router.put("/me", updateProfileValidationRules, validateRequest, updateProfile);

module.exports = router;


