require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const connectDB = require("./config/db");
const { configureCloudinary } = require("./config/cloudinary");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const protect = require("./middleware/authMiddleware");

// ── Initialize Express App ──
const app = express();

// ── Connect to MongoDB Atlas ──
connectDB();
configureCloudinary();

// ── Middleware ──
const allowedOrigins = [
    "https://grow-orcin-ten.vercel.app",
    "http://localhost:5173",
    "http://localhost:4173",
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow non-browser tools (no Origin) and known frontends
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }
        callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── API Routes ──
app.use("/api/auth", authRoutes);
app.use("/api/users", protect, userRoutes);
app.use("/api/notes", noteRoutes);

// ── Health Check Route ──
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "GROW – Online Student Notes Marketplace API is running 🚀",
        version: "1.0.0",
    });
});

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        status: "OK",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development",
    });
});

// ── 404 Handler ──
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
    });
});

// ── Global Error Handler ──
app.use((err, req, res, next) => {
    console.error("❌ Server Error:", err.stack || err.message);

    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(413).json({
                success: false,
                message: "File too large. Maximum PDF size is 10MB.",
            });
        }
        return res.status(400).json({
            success: false,
            message: err.message || "File upload error.",
        });
    }

    if (err.message === "Only PDF files are allowed.") {
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }

    if (err.message === "Not allowed by CORS") {
        return res.status(403).json({
            success: false,
            message: "CORS: origin not allowed.",
        });
    }

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

// ── Start Server ──
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("================================================");
    console.log(`🚀  GROW API Server started`);
    console.log(`📡  Listening on port ${PORT}`);
    console.log(`🌍  URL: http://localhost:${PORT}`);
    console.log("================================================");
});

module.exports = app;
