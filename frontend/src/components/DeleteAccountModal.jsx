import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { deleteAccount } from '../services/authService';

/**
 * Confirmation modal for permanently deleting the authenticated user's account.
 */
const DeleteAccountModal = ({ isOpen, onClose }) => {
    const { logout } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleDelete = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await deleteAccount();
            if (res.data?.success) {
                onClose();
                logout();
                toast.success(res.data?.message || 'Account deleted successfully');
                navigate('/login');
            } else {
                const msg = res.data?.message || 'Failed to delete account.';
                setError(msg);
                toast.error(msg);
            }
        } catch (err) {
            const status = err.response?.status;
            let msg = 'Failed to delete account. Please try again.';
            if (err.response?.data?.message) {
                msg = err.response.data.message;
            } else if (status === 401) {
                msg = 'Your session has expired. Please log in again.';
            } else if (status === 404) {
                msg = 'Account not found or already deleted.';
            } else if (status === 500) {
                msg = 'Server error during deletion. Please try again later.';
            } else if (!err.response) {
                msg = 'Network error. Please check your connection and try again.';
            }
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (loading) return;
        setError('');
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={handleClose} role="presentation">
            <div
                className="modal-card glass-card"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="delete-modal-title"
                style={{ maxWidth: '480px' }}
            >
                <button
                    type="button"
                    className="modal-close"
                    onClick={handleClose}
                    disabled={loading}
                    aria-label="Close modal"
                >
                    ✕
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '1.5rem' }}>⚠️</span>
                    <h2 id="delete-modal-title" className="modal-title" style={{ margin: 0, color: 'var(--accent)' }}>
                        Delete your account?
                    </h2>
                </div>

                <p style={{ color: 'var(--text-secondary)', marginTop: '12px', fontSize: '0.95rem' }}>
                    This will permanently delete:
                </p>

                <ul style={{ color: 'var(--text-muted)', margin: '10px 0 16px 20px', fontSize: '0.9rem', lineHeight: '1.8' }}>
                    <li>Your account</li>
                    <li>Your uploaded notes</li>
                    <li>Your associated files</li>
                </ul>

                <p style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '16px' }}>
                    This action cannot be undone.
                </p>

                {error && (
                    <div className="alert alert-error" style={{ marginBottom: '16px' }} role="alert">
                        <span>⚠</span>
                        <span>{error}</span>
                    </div>
                )}

                <div className="modal-footer" style={{ justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                    <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={handleClose}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="btn"
                        style={{
                            background: 'var(--accent)',
                            color: '#fff',
                            boxShadow: '0 4px 16px rgba(255, 107, 107, 0.3)',
                        }}
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner" /> Deleting Account…
                            </>
                        ) : (
                            'Delete Account'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccountModal;
