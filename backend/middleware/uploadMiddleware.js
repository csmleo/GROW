const multer = require("multer");

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB — fits Cloudinary free-tier limits

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const isPdfMime = file.mimetype === "application/pdf";
    const isPdfExt = file.originalname.toLowerCase().endsWith(".pdf");

    if (isPdfMime && isPdfExt) {
        cb(null, true);
        return;
    }

    cb(new Error("Only PDF files are allowed."));
};

const upload = multer({
    storage,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter,
});

module.exports = { upload, MAX_FILE_SIZE };
