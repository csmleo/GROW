/** Modal popup for note preview */
const NotePreviewModal = ({ note, onClose }) => {
    if (!note) return null;

    const tags = Array.isArray(note.tags) ? note.tags : [];
    const downloads = note.downloads ?? 0;
    const canOpenFile = Boolean(note.fileUrl);

    const handlePrimaryAction = () => {
        if (canOpenFile) {
            window.open(note.fileUrl, '_blank', 'noopener,noreferrer');
            return;
        }
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose} role="presentation">
            <div className="modal-card glass-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
                <button type="button" className="modal-close" onClick={onClose} aria-label="Close preview">✕</button>

                <div className="modal-header">
                    <span className="badge badge-primary">{note.subject}</span>
                    {note.category && <span className="badge badge-secondary">{note.category}</span>}
                    {note.isFree && <span className="badge badge-free">FREE</span>}
                </div>

                <h2 className="modal-title">{note.title}</h2>
                <p className="modal-preview">{note.preview}</p>

                <div className="modal-meta">
                    <span>👤 {note.author}</span>
                    <span>📄 {note.pages || 0} pages</span>
                    <span>⬇️ {downloads.toLocaleString()} downloads</span>
                    <span>⭐ {note.rating ?? 0} ({note.reviews ?? 0} reviews)</span>
                </div>

                <div className="modal-tags">
                    {tags.map((tag) => (
                        <span key={tag} className="note-tag">#{tag}</span>
                    ))}
                </div>

                <div className="modal-footer">
                    <span className="modal-price">{note.isFree ? 'Free' : `₹${note.price}`}</span>
                    <button type="button" className="btn btn-primary" onClick={handlePrimaryAction}>
                        {canOpenFile
                            ? (note.isFree ? 'Open PDF' : 'Open Notes')
                            : (note.isFree ? 'Download Free' : 'Get Notes')} →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotePreviewModal;
