const express = require("express");
const router = express.Router();
const { register, login, getMe } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
const {
    registerValidationRules,
    loginValidationRules,
    validateRequest,
} = require("../middleware/validationMiddleware");

// POST /api/auth/register
router.post("/register", registerValidationRules, validateRequest, register);

// POST /api/auth/login
router.post("/login", loginValidationRules, validateRequest, login);

// GET  /api/auth/me  (protected)
router.get("/me", protect, getMe);

module.exports = router;
