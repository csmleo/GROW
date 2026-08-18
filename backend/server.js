require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const protect = require("./middleware/authMiddleware");

// ── Initialize Express App ──
const app = express();

// ── Connect to MongoDB Atlas ──
connectDB();

// ── Middleware ──
app.use(cors({
    origin: "https://grow-orcin-ten.vercel.app",       // Frontend dev server
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,                     // Allow cookies / Authorization headers
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── API Routes ──
app.use("/api/auth", authRoutes);
app.use("/api/users", protect, userRoutes);

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
    console.error("❌ Server Error:", err.stack);
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
