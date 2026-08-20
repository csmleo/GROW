import { useBookmarks } from '../context/BookmarkContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import './NoteCard.css';

const StarRating = ({ rating }) => (
    <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className={star <= Math.round(rating) ? 'star-filled' : 'star-empty'}>★</span>
        ))}
    </div>
);

const NoteCard = ({ note, onPreview, featured = false }) => {
    const { toast } = useToast();
    const { isBookmarked, toggleBookmark } = useBookmarks();
    const saved = isBookmarked(note.id);

    const {
        title, subject, author, authorAvatar, price, rating,
        reviews, pages, downloads, preview, isBestseller, isFree, tags, fileType, category, fileUrl,
    } = note;

    const handleBookmark = (e) => {
        e.stopPropagation();
        toggleBookmark(note.id);
        toast.success(saved ? 'Removed from bookmarks' : 'Saved to bookmarks');
    };

    const handleCardClick = () => onPreview?.(note);

    const handleOpenPdf = (e) => {
        e.stopPropagation();
        if (fileUrl) {
            window.open(fileUrl, '_blank', 'noopener,noreferrer');
        } else {
            onPreview?.(note);
        }
    };

    return (
        <article
            className={`note-card card ${featured ? 'note-card-featured' : ''}`}
            onClick={handleCardClick}
            onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
            role="button"
            tabIndex={0}
        >
            <div className="note-card-header">
                <div className="note-subject-badge badge badge-primary">{subject}</div>
                <div className="note-badges">
                    {category && <span className="badge badge-category">{category}</span>}
                    {isBestseller && <span className="badge badge-gold">⭐ Bestseller</span>}
                    {isFree && <span className="badge badge-free">FREE</span>}
                    <button
                        type="button"
                        className={`bookmark-btn ${saved ? 'saved' : ''}`}
                        onClick={handleBookmark}
                        aria-label={saved ? 'Remove bookmark' : 'Bookmark note'}
                    >
                        {saved ? '🔖' : '🔗'}
                    </button>
                </div>
            </div>

            <div className="note-card-body">
                <h3 className="note-title">{title}</h3>
                <p className="note-preview">{preview}</p>
                <div className="note-tags">
                    {(tags || []).slice(0, 3).map((tag) => (
                        <span key={tag} className="note-tag">#{tag}</span>
                    ))}
                </div>
            </div>

            <div className="note-meta">
                <div className="note-meta-row">
                    <div className="note-author">
                        <div className="author-avatar">{authorAvatar}</div>
                        <span className="author-name">{author}</span>
                    </div>
                    <span className="note-file-type">{fileType || 'PDF'}</span>
                </div>
                <div className="note-stats">
                    <span className="note-stat">📄 {pages || 0} pages</span>
                    <span className="note-stat">⬇️ {(downloads ?? 0).toLocaleString()}</span>
                    <span className="note-stat">💬 {reviews ?? 0}</span>
                </div>
            </div>

            <div className="note-card-footer">
                <div className="note-rating-price">
                    <div className="note-rating">
                        <StarRating rating={rating} />
                        <span className="rating-value">{rating}</span>
                    </div>
                    <div className="note-price">
                        {isFree ? <span className="price-free">Free</span> : <span className="price-paid">₹{price}</span>}
                    </div>
                </div>
                {fileUrl ? (
                    <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                        <button
                            type="button"
                            className="btn btn-primary btn-sm note-cta"
                            style={{ flex: 1 }}
                            onClick={handleOpenPdf}
                        >
                            📄 Open PDF
                        </button>
                        <button
                            type="button"
                            className="btn btn-ghost btn-sm"
                            style={{ padding: '0 12px' }}
                            onClick={(e) => {
                                e.stopPropagation();
                                onPreview?.(note);
                            }}
                            title="Preview Details"
                            aria-label="Preview Details"
                        >
                            👁️
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        className="btn btn-primary btn-sm note-cta"
                        onClick={(e) => { e.stopPropagation(); onPreview?.(note); }}
                    >
                        Preview →
                    </button>
                )}
            </div>
        </article>
    );
};

export default NoteCard;
