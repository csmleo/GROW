import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { updateProfile } from '../services/authService';

/**
 * Modal dialog for editing the authenticated user's basic profile (name and email).
 */
const EditProfileModal = ({ isOpen, onClose, currentUser }) => {
    const { updateUser } = useAuth();
    const { toast } = useToast();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(false);

    // Initialize or reset form values when opening
    useEffect(() => {
        if (isOpen) {
            setName(currentUser?.name || '');
            setEmail(currentUser?.email || '');
            setErrors({});
            setApiError('');
        }
    }, [isOpen, currentUser]);

    if (!isOpen) return null;

    const validate = () => {
        const errs = {};
        const trimmedName = name.trim();
        const trimmedEmail = email.trim();

        if (!trimmedName) {
            errs.name = 'Full name is required.';
        } else if (trimmedName.length < 2) {
            errs.name = 'Name must be at least 2 characters long.';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!trimmedEmail) {
            errs.email = 'Email address is required.';
        } else if (!emailRegex.test(trimmedEmail)) {
            errs.email = 'Please enter a valid email address.';
        }

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleClose = () => {
        if (loading) return;
        setErrors({});
        setApiError('');
        onClose();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError('');

        if (!validate()) {
            return;
        }

        setLoading(true);
        try {
            const res = await updateProfile({
                name: name.trim(),
                email: email.trim().toLowerCase(),
            });

            if (res.data?.success && res.data?.user) {
                updateUser(res.data.user);
                toast.success(res.data.message || 'Profile updated successfully!');
                onClose();
            } else {
                const msg = res.data?.message || 'Failed to update profile.';
                setApiError(msg);
                toast.error(msg);
            }
        } catch (err) {
            const serverMsg = err.response?.data?.message;
            let msg = serverMsg || 'Failed to update profile. Please try again.';

            if (err.response?.status === 401) {
                msg = 'Your session has expired. Please log in again.';
            } else if (!err.response) {
                msg = 'Network error. Please check your connection and try again.';
            }

            setApiError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={handleClose} role="presentation">
            <div
                className="modal-card glass-card"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="edit-profile-modal-title"
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
                    <span style={{ fontSize: '1.4rem' }}>✏️</span>
                    <h2 id="edit-profile-modal-title" className="modal-title" style={{ margin: 0 }}>
                        Edit Profile
                    </h2>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
                    Update your account details below.
                </p>

                {apiError && (
                    <div className="alert alert-error" style={{ marginBottom: '16px' }} role="alert">
                        <span>⚠</span>
                        <span>{apiError}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                    <div className="form-group" style={{ marginBottom: '16px' }}>
                        <label htmlFor="edit-name" className="form-label">
                            Full Name <span style={{ color: 'var(--accent)' }}>*</span>
                        </label>
                        <input
                            id="edit-name"
                            type="text"
                            className="form-input"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                            }}
                            placeholder="Your full name"
                            disabled={loading}
                            autoComplete="name"
                            required
                        />
                        {errors.name && (
                            <span style={{ color: 'var(--accent)', fontSize: '0.8rem', marginTop: '4px' }}>
                                {errors.name}
                            </span>
                        )}
                    </div>

                    <div className="form-group" style={{ marginBottom: '16px' }}>
                        <label htmlFor="edit-email" className="form-label">
                            Email Address <span style={{ color: 'var(--accent)' }}>*</span>
                        </label>
                        <input
                            id="edit-email"
                            type="email"
                            className="form-input"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                            }}
                            placeholder="your.email@example.com"
                            disabled={loading}
                            autoComplete="email"
                            required
                        />
                        {errors.email && (
                            <span style={{ color: 'var(--accent)', fontSize: '0.8rem', marginTop: '4px' }}>
                                {errors.email}
                            </span>
                        )}
                    </div>

                    <div className="form-group" style={{ marginBottom: '20px' }}>
                        <label className="form-label">Account Role</label>
                        <div
                            style={{
                                padding: '10px 14px',
                                background: 'rgba(255, 255, 255, 0.04)',
                                border: '1px solid var(--border)',
                                borderRadius: 'var(--radius-md)',
                                color: 'var(--text-muted)',
                                fontSize: '0.9rem',
                                textTransform: 'capitalize',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <span>{currentUser?.role || 'student'}</span>
                            <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>Managed by system</span>
                        </div>
                    </div>

                    <div className="modal-footer" style={{ justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
                        <button
                            type="button"
                            className="btn btn-ghost"
                            onClick={handleClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner" /> Saving Changes…
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;
