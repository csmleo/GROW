// User-related controllers (separate from auth)
const User = require("../models/User");

// GET /api/users/me
// Return current authenticated user's basic profile
exports.getMe = async (req, res) => {
    try {
        // req.user is attached by protect middleware
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Not authorised." });
        }

        const { _id, name, email, role } = req.user;
        res.status(200).json({
            success: true,
            user: { id: _id, name, email, role },
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

