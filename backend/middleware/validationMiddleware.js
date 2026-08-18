const { body, validationResult } = require("express-validator");

// Common validation rules for auth
exports.registerValidationRules = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required."),
    body("email")
        .trim()
        .isEmail()
        .withMessage("Please provide a valid email address."),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long."),
    body("role")
        .optional()
        .isIn(["student", "creator", "both"])
        .withMessage("Invalid role."),
];

exports.loginValidationRules = [
    body("email")
        .trim()
        .isEmail()
        .withMessage("Please provide a valid email address."),
    body("password")
        .notEmpty()
        .withMessage("Password is required."),
];

// Middleware to run after rules
exports.validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    // Keep response format simple and compatible with existing frontend
    const firstError = errors.array()[0];
    return res.status(400).json({
        success: false,
        message: firstError.msg,
        errors: errors.array(),
    });
};

