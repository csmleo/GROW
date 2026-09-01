import { downloadPdf } from '../utils/notesUtils';

/** Modal popup for note preview */
const NotePreviewModal = ({ note, onClose }) => {
    if (!note) return null;

    const tags = Array.isArray(note.tags) ? note.tags : [];
    const downloads = note.downloads ?? 0;
    const canOpenFile = Boolean(note.fileUrl);
    const hasDistinctCategory =
        note.category &&
        note.category.trim().toLowerCase() !== (note.subject || '').trim().toLowerCase();

    const handleOpen = () => {
        if (canOpenFile) {
            window.open(note.fileUrl, '_blank', 'noopener,noreferrer');
            return;
        }
        onClose();
    };

    const handleDownload = (e) => {
        e.stopPropagation();
        if (note.fileUrl) {
            downloadPdf(note.fileUrl, note.originalFilename || `${note.title || 'note'}.pdf`);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose} role="presentation">
            <div className="modal-card glass-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
                <button type="button" className="modal-close" onClick={onClose} aria-label="Close preview">✕</button>

                <div className="modal-header" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span className="badge badge-primary">{note.subject || 'General'}</span>
                    {hasDistinctCategory && (
                        <>
                            <span style={{ color: 'var(--text-muted)' }}>·</span>
                            <span className="badge badge-secondary">{note.category}</span>
                        </>
                    )}
                    <span style={{ color: 'var(--text-muted)' }}>·</span>
                    {note.isFree || note.price === 0 ? (
                        <span className="badge badge-free">FREE</span>
                    ) : (
                        <span className="badge badge-gold">₹{note.price}</span>
                    )}
                </div>

                <h2 className="modal-title">{note.title}</h2>
                <p className="modal-preview">{note.preview}</p>

                <div className="modal-meta">
                    <span>👤 {note.author}</span>
                    <span>📄 {note.pages || 0} pages</span>
                    <span>⬇️ {downloads.toLocaleString()} downloads</span>
                    <span>⭐ {note.rating ?? 0} ({note.reviews ?? 0} reviews)</span>
                </div>

                {tags.length > 0 && (
                    <div className="modal-tags">
                        {tags.map((tag) => (
                            <span key={tag} className="note-tag">#{tag}</span>
                        ))}
                    </div>
                )}

                <div className="modal-footer">
                    <span className="modal-price">{note.isFree || note.price === 0 ? 'Free' : `₹${note.price}`}</span>
                    {canOpenFile ? (
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button type="button" className="btn btn-primary" onClick={handleOpen}>
                                📄 Open PDF ↗
                            </button>
                            <button
                                type="button"
                                className="btn btn-ghost"
                                style={{ display: 'inline-flex', alignItems: 'center' }}
                                onClick={handleDownload}
                            >
                                ⬇ Download
                            </button>
                        </div>
                    ) : (
                        <button type="button" className="btn btn-primary" onClick={onClose}>
                            Close
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotePreviewModal;
