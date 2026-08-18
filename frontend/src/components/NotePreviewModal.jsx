/** Modal popup for note preview */
const NotePreviewModal = ({ note, onClose }) => {
    if (!note) return null;

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
                    <span>📄 {note.pages} pages</span>
                    <span>⬇️ {note.downloads.toLocaleString()} downloads</span>
                    <span>⭐ {note.rating} ({note.reviews} reviews)</span>
                </div>

                <div className="modal-tags">
                    {note.tags.map((tag) => (
                        <span key={tag} className="note-tag">#{tag}</span>
                    ))}
                </div>

                <div className="modal-footer">
                    <span className="modal-price">{note.isFree ? 'Free' : `₹${note.price}`}</span>
                    <button type="button" className="btn btn-primary" onClick={onClose}>
                        {note.isFree ? 'Download Free' : 'Get Notes'} →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotePreviewModal;
