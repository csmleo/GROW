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

// PUT /api/users/profile
// Update current authenticated user's basic profile (name, email)
exports.updateProfile = async (req, res) => {
    try {
        // Strictly derive identity from req.user (authenticated via JWT)
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Not authorised." });
        }

        const userId = req.user._id || req.user.id;
        const { name, email } = req.body;

        if (!name || typeof name !== "string" || !name.trim()) {
            return res.status(400).json({ success: false, message: "Name is required." });
        }

        if (!email || typeof email !== "string" || !email.trim()) {
            return res.status(400).json({ success: false, message: "Email is required." });
        }

        const trimmedName = name.trim();
        const trimmedEmail = email.trim().toLowerCase();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            return res.status(400).json({ success: false, message: "Please provide a valid email address." });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // If email has changed, check for existing user with that email
        if (trimmedEmail !== user.email.toLowerCase()) {
            const emailInUse = await User.findOne({
                email: trimmedEmail,
                _id: { $ne: userId },
            });
            if (emailInUse) {
                return res.status(400).json({
                    success: false,
                    message: "Email is already in use by another account.",
                });
            }
        }

        user.name = trimmedName;
        user.email = trimmedEmail;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        console.error("❌ Update profile error:", err);
        return res.status(500).json({
            success: false,
            message: err.message || "Failed to update profile.",
        });
    }
};


