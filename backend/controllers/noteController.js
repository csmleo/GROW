const streamifier = require("streamifier");
const Note = require("../models/Note");
const { cloudinary } = require("../config/cloudinary");

const uploadBufferToCloudinary = (buffer, originalFilename) =>
    new Promise((resolve, reject) => {
        const safeName = originalFilename
            .replace(/\.pdf$/i, "")
            .replace(/[^a-zA-Z0-9-_]/g, "_")
            .slice(0, 80);

        const stream = cloudinary.uploader.upload_stream(
            {
                resource_type: "raw",
                folder: "grow-notes",
                public_id: `${Date.now()}-${safeName}.pdf`,
                format: "pdf",
            },
            (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            }
        );

        streamifier.createReadStream(buffer).pipe(stream);
    });

const formatNoteResponse = (note) => {
    const uploader = note.uploader;
    return {
        id: note._id,
        _id: note._id,
        title: note.title,
        description: note.description,
        subject: note.subject,
        category: note.category || note.subject,
        fileUrl: note.fileUrl,
        originalFilename: note.originalFilename,
        fileSize: note.fileSize,
        price: note.price ?? 0,
        isFree: Boolean(note.isFree || note.price === 0),
        tags: Array.isArray(note.tags) ? note.tags : [],
        pages: note.pages || 0,
        downloads: note.downloads ?? 0,
        rating: note.rating ?? 0,
        reviews: note.reviews ?? 0,
        createdAt: note.createdAt,
        uploadDate: note.createdAt,
        uploader: uploader
            ? {
                  id: uploader._id,
                  _id: uploader._id,
                  name: uploader.name,
                  email: uploader.email,
              }
            : null,
        author: uploader?.name || "Unknown",
        fileType: "PDF",
    };
};

// POST /api/notes/upload
exports.uploadNote = async (req, res) => {
    try {
        const { title, description = "", subject, category, price, isFree, tags, pages } = req.body;

        if (!title || !String(title).trim()) {
            return res.status(400).json({ success: false, message: "Title is required." });
        }
        if (!subject || !String(subject).trim()) {
            return res.status(400).json({ success: false, message: "Subject/category is required." });
        }
        if (!req.file) {
            return res.status(400).json({ success: false, message: "PDF file is required." });
        }

        if (
            !process.env.CLOUDINARY_CLOUD_NAME ||
            !process.env.CLOUDINARY_API_KEY ||
            !process.env.CLOUDINARY_API_SECRET
        ) {
            return res.status(500).json({
                success: false,
                message: "File storage is not configured on the server.",
            });
        }

        const freeFlag =
            isFree === true ||
            isFree === "true" ||
            isFree === "1" ||
            isFree === 1;

        const numericPrice = freeFlag ? 0 : Number(price);
        if (!freeFlag && (Number.isNaN(numericPrice) || numericPrice <= 0)) {
            return res.status(400).json({
                success: false,
                message: "Enter a valid price or mark the note as free.",
            });
        }

        let tagList = [];
        if (Array.isArray(tags)) {
            tagList = tags.map((t) => String(t).trim()).filter(Boolean);
        } else if (typeof tags === "string" && tags.trim()) {
            tagList = tags
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean);
        }

        const uploadResult = await uploadBufferToCloudinary(req.file.buffer, req.file.originalname);

        const note = await Note.create({
            title: String(title).trim(),
            description: String(description || "").trim(),
            subject: String(subject).trim(),
            category: String(category || subject).trim(),
            uploader: req.user._id,
            fileUrl: uploadResult.secure_url,
            cloudinaryPublicId: uploadResult.public_id,
            originalFilename: req.file.originalname,
            fileSize: req.file.size,
            price: numericPrice || 0,
            isFree: freeFlag || numericPrice === 0,
            tags: tagList,
            pages: pages ? Number(pages) || 0 : 0,
        });

        await note.populate("uploader", "name email");

        return res.status(201).json({
            success: true,
            message: "Note uploaded successfully",
            note: formatNoteResponse(note),
        });
    } catch (err) {
        console.error("Upload note error:", err);
        return res.status(500).json({
            success: false,
            message: err.message || "Failed to upload note.",
        });
    }
};

// GET /api/notes
exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find()
            .populate("uploader", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: notes.length,
            notes: notes.map(formatNoteResponse),
        });
    } catch (err) {
        console.error("Get notes error:", err);
        return res.status(500).json({
            success: false,
            message: err.message || "Failed to fetch notes.",
        });
    }
};

// GET /api/notes/my (authenticated user's notes)
exports.getMyNotes = async (req, res) => {
    try {
        const userId = req.user._id;
        const notes = await Note.find({ uploader: userId })
            .populate("uploader", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: notes.length,
            notes: notes.map(formatNoteResponse),
        });
    } catch (err) {
        console.error("Get my notes error:", err);
        return res.status(500).json({
            success: false,
            message: err.message || "Failed to fetch your notes.",
        });
    }
};

// GET /api/notes/:id
exports.getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id).populate("uploader", "name email");
        if (!note) {
            return res.status(404).json({ success: false, message: "Note not found." });
        }

        return res.status(200).json({
            success: true,
            note: formatNoteResponse(note),
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message || "Failed to fetch note.",
        });
    }
};

