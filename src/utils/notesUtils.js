/** Filter notes by search query, category, and subject */
export const filterNotes = (notes, { search = '', category = 'All', subject = 'All' } = {}) => {
    let result = [...notes];
    const q = search.trim().toLowerCase();

    if (q) {
        result = result.filter(
            (n) =>
                n.title.toLowerCase().includes(q) ||
                n.subject.toLowerCase().includes(q) ||
                n.author.toLowerCase().includes(q) ||
                (n.category && n.category.toLowerCase().includes(q)) ||
                n.tags?.some((t) => t.toLowerCase().includes(q))
        );
    }

    if (category !== 'All') {
        result = result.filter((n) => n.category === category);
    }

    if (subject !== 'All') {
        result = result.filter((n) => n.subject === subject);
    }

    return result;
};

/** Top notes by downloads + rating for trending section */
export const getTrendingNotes = (notes = [], limit = 4) =>
    [...notes]
        .sort((a, b) => {
            const scoreA = (a.downloads || 0) * (a.rating || 0);
            const scoreB = (b.downloads || 0) * (b.rating || 0);
            if (scoreB !== scoreA) return scoreB - scoreA;
            if ((b.downloads || 0) !== (a.downloads || 0)) return (b.downloads || 0) - (a.downloads || 0);
            return new Date(b.uploadDate || b.createdAt || 0) - new Date(a.uploadDate || a.createdAt || 0);
        })
        .slice(0, limit);

/**
 * Generate a Cloudinary attachment/download URL if possible
 */
export const getDownloadUrl = (fileUrl, filename) => {
    if (!fileUrl) return '';
    if (fileUrl.includes('/raw/upload/') && !fileUrl.includes('/fl_attachment')) {
        const cleanName = (filename || 'note.pdf').replace(/[^a-zA-Z0-9._-]/g, '_');
        return fileUrl.replace('/raw/upload/', `/raw/upload/fl_attachment:${cleanName}/`);
    }
    return fileUrl;
};

/**
 * Trigger browser download for a PDF file
 */
export const downloadPdf = async (fileUrl, filename = 'document.pdf') => {
    if (!fileUrl) return;

    const safeFilename = filename.toLowerCase().endsWith('.pdf') ? filename : `${filename}.pdf`;
    const targetUrl = getDownloadUrl(fileUrl, safeFilename);

    try {
        const response = await fetch(fileUrl, { mode: 'cors' });
        if (response.ok) {
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = blobUrl;
            a.download = safeFilename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => window.URL.revokeObjectURL(blobUrl), 2000);
            return;
        }
    } catch {
        // Fetch failed due to CORS or network; fallback to direct download link navigation
    }

    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = targetUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.download = safeFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
