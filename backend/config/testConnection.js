/**
 * Standalone MongoDB Atlas connection test
 * Run: node config/testConnection.js
 */
require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const mongoose = require("mongoose");

console.log("🔍 Testing MongoDB Atlas connection...");
console.log(`📍 URI: ${process.env.MONGO_URI ? process.env.MONGO_URI.replace(/:([^@]+)@/, ":****@") : "NOT SET"}`);
console.log("");

mongoose
    .connect(process.env.MONGO_URI, {
        tls: true,
        serverSelectionTimeoutMS: 15000,
        family: 4,
    })
    .then((conn) => {
        console.log("✅  Connected to MongoDB Atlas successfully!");
        console.log(`📦  Host: ${conn.connection.host}`);
        console.log(`🗄️  Database: ${conn.connection.name}`);
        process.exit(0);
    })
    .catch((err) => {
        console.error("❌  Connection failed:", err.message);
        console.error("");
        if (err.message.includes("SSL") || err.message.includes("tls")) {
            console.error("💡 TIP: This is an SSL/TLS error. Possible causes:");
            console.error("   1. Your IP is not whitelisted in MongoDB Atlas Network Access.");
            console.error("      → Go to Atlas > Network Access > Add IP Address > 0.0.0.0/0 (Allow All)");
            console.error("   2. Firewall or antivirus is blocking the connection.");
            console.error("   3. Node.js OpenSSL version incompatibility.");
        }
        if (err.message.includes("authentication") || err.message.includes("auth")) {
            console.error("💡 TIP: Authentication failed. Check your username/password in the MONGO_URI.");
        }
        if (err.message.includes("ENOTFOUND") || err.message.includes("DNS")) {
            console.error("💡 TIP: DNS resolution failed. Check your internet connection.");
        }
        process.exit(1);
    });
