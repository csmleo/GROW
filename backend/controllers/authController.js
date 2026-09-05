const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Note = require("../models/Note");
const { cloudinary } = require("../config/cloudinary");

// ── Helper: Sign JWT ──
const signToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// ── POST /api/auth/register ──
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ success: false, message: "Email already registered." });
        }

        const allowedRoles = ["student", "creator", "both"];
        const safeRole = allowedRoles.includes(role) ? role : "student";
        const user = await User.create({ name, email, password, role: safeRole });
        const token = signToken(user._id);

        res.status(201).json({
            success: true,
            message: "Account created successfully.",
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// ── POST /api/auth/login ──
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required." });
        }

        // Explicitly select password (it's hidden by default)
        const user = await User.findOne({ email }).select("+password");
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ success: false, message: "Invalid email or password." });
        }

        const token = signToken(user._id);

        res.status(200).json({
            success: true,
            message: "Logged in successfully.",
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// ── GET /api/auth/me  (protected) ──
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// ── DELETE /api/auth/account  (protected) ──
exports.deleteAccount = async (req, res) => {
    try {
        const userId = req.user._id || req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // 1. Find all notes uploaded by this user
        const userNotes = await Note.find({ uploader: userId });

        // 2. Clean up associated Cloudinary files safely if public_id is present
        if (userNotes.length > 0) {
            const isCloudinaryConfigured = Boolean(
                process.env.CLOUDINARY_CLOUD_NAME &&
                process.env.CLOUDINARY_API_KEY &&
                process.env.CLOUDINARY_API_SECRET
            );

            if (isCloudinaryConfigured) {
                const cloudinaryDeletions = userNotes
                    .filter((note) => note.cloudinaryPublicId)
                    .map(async (note) => {
                        try {
                            await cloudinary.uploader.destroy(note.cloudinaryPublicId, {
                                resource_type: "raw",
                            });
                        } catch (err) {
                            console.error(
                                `⚠️ Failed to delete Cloudinary file (${note.cloudinaryPublicId}):`,
                                err.message
                            );
                        }
                    });

                if (cloudinaryDeletions.length > 0) {
                    await Promise.allSettled(cloudinaryDeletions);
                }
            } else {
                console.warn(
                    "⚠️ Cloudinary credentials not fully configured; skipping remote asset deletion."
                );
            }

            // 3. Delete user's notes from MongoDB
            await Note.deleteMany({ uploader: userId });
        }

        // 4. Delete user from MongoDB
        await User.findByIdAndDelete(userId);

        return res.status(200).json({
            success: true,
            message: "Account deleted successfully",
        });
    } catch (err) {
        console.error("❌ Delete account error:", err);
        return res.status(500).json({
            success: false,
            message: err.message || "Failed to delete account.",
        });
    }
};

