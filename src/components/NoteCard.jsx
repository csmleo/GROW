import { Link } from 'react-router-dom';
import './NoteCard.css';

const StarRating = ({ rating }) => {
    return (
        <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className={star <= Math.round(rating) ? 'star-filled' : 'star-empty'}>
                    ★
                </span>
            ))}
        </div>
    );
};

const NoteCard = ({ note }) => {
    const {
        id, title, subject, author, authorAvatar, price, rating,
        reviews, pages, downloads, preview, isBestseller, isFree, tags, fileType,
    } = note;

    return (
        <div className="note-card card">
            {/* Card Header */}
            <div className="note-card-header">
                <div className="note-subject-badge badge badge-primary">{subject}</div>
                <div className="note-badges">
                    {isBestseller && <span className="badge badge-gold">⭐ Bestseller</span>}
                    {isFree && <span className="badge badge-free">FREE</span>}
                </div>
            </div>

            {/* Card Body */}
            <div className="note-card-body">
                <h3 className="note-title">{title}</h3>
                <p className="note-preview">{preview}</p>

                {/* Tags */}
                <div className="note-tags">
                    {tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="note-tag">#{tag}</span>
                    ))}
                </div>
            </div>

            {/* Meta Info */}
            <div className="note-meta">
                <div className="note-meta-row">
                    <div className="note-author">
                        <div className="author-avatar">{authorAvatar}</div>
                        <span className="author-name">{author}</span>
                    </div>
                    <span className="note-file-type">{fileType}</span>
                </div>
                <div className="note-stats">
                    <span className="note-stat">
                        <span className="note-stat-icon">📄</span>
                        {pages} pages
                    </span>
                    <span className="note-stat">
                        <span className="note-stat-icon">⬇️</span>
                        {downloads.toLocaleString()}
                    </span>
                    <span className="note-stat">
                        <span className="note-stat-icon">💬</span>
                        {reviews}
                    </span>
                </div>
            </div>

            {/* Card Footer */}
            <div className="note-card-footer">
                <div className="note-rating-price">
                    <div className="note-rating">
                        <StarRating rating={rating} />
                        <span className="rating-value">{rating}</span>
                    </div>
                    <div className="note-price">
                        {isFree ? (
                            <span className="price-free">Free</span>
                        ) : (
                            <span className="price-paid">₹{price}</span>
                        )}
                    </div>
                </div>
                <Link to={`/browse`} className="btn btn-primary btn-sm note-cta">
                    {isFree ? 'Download Free' : 'Get Notes'}
                    <span>→</span>
                </Link>
            </div>
        </div>
    );
};

export default NoteCard;
