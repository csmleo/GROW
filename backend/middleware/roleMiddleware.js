// Assumes that `protect` has already attached the full user document to req.user

const requireRole = (role) => (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Not authorised.",
        });
    }

    if (req.user.role !== role) {
        return res.status(403).json({
            success: false,
            message: "You do not have permission to perform this action.",
        });
    }

    next();
};

module.exports = { requireRole };

