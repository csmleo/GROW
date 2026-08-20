const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            maxlength: [100, "Title cannot exceed 100 characters"],
        },
        description: {
            type: String,
            trim: true,
            maxlength: [500, "Description cannot exceed 500 characters"],
            default: "",
        },
        subject: {
            type: String,
            required: [true, "Subject is required"],
            trim: true,
        },
        category: {
            type: String,
            trim: true,
            default: "",
        },
        uploader: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        fileUrl: {
            type: String,
            required: [true, "File URL is required"],
        },
        cloudinaryPublicId: {
            type: String,
            default: "",
        },
        originalFilename: {
            type: String,
            required: true,
        },
        fileSize: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            default: 0,
            min: 0,
        },
        isFree: {
            type: Boolean,
            default: true,
        },
        tags: {
            type: [String],
            default: [],
        },
        pages: {
            type: Number,
            default: 0,
            min: 0,
        },
        downloads: {
            type: Number,
            default: 0,
        },
        rating: {
            type: Number,
            default: 0,
        },
        reviews: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

noteSchema.index({ createdAt: -1 });
noteSchema.index({ subject: 1 });
noteSchema.index({ uploader: 1 });

module.exports = mongoose.model("Note", noteSchema);
