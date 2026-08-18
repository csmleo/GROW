const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // TLS/SSL fix for Node.js OpenSSL compatibility with MongoDB Atlas
            tls: true,
            tlsAllowInvalidCertificates: false,
            serverSelectionTimeoutMS: 10000, // 10 s before giving up
            socketTimeoutMS: 45000,
            family: 4, // Force IPv4 (avoids IPv6 DNS resolution issues on some machines)
        });

        console.log("================================================");
        console.log("✅  MongoDB Connected Successfully");
        console.log(`📦  Host    : ${conn.connection.host}`);
        console.log(`🗄️  Database : ${conn.connection.name}`);
        console.log("================================================");
    } catch (error) {
        console.error("================================================");
        console.error("❌  MongoDB Connection Failed");
        console.error(`🔴  Error   : ${error.message}`);
        console.error("================================================");
        process.exit(1);
    }
};

// ── Connection lifecycle events ──
mongoose.connection.on("disconnected", () => {
    console.warn("⚠️  MongoDB disconnected. Attempting to reconnect…");
});

mongoose.connection.on("reconnected", () => {
    console.log("🔄  MongoDB reconnected successfully");
});

// Graceful shutdown on Ctrl+C
process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("🛑  MongoDB connection closed due to app termination");
    process.exit(0);
});

module.exports = connectDB;
