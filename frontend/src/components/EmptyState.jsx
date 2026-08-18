/** Placeholder when no notes match filters */
const EmptyState = ({ icon = '📭', title = 'No notes found', message, actionLabel, onAction }) => (
    <div className="empty-state">
        <div className="empty-state-icon">{icon}</div>
        <h3 className="empty-state-title">{title}</h3>
        {message && <p className="empty-state-message">{message}</p>}
        {actionLabel && onAction && (
            <button type="button" className="btn btn-primary" onClick={onAction}>
                {actionLabel}
            </button>
        )}
    </div>
);

export default EmptyState;
