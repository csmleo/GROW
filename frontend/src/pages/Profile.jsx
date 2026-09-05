import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import EditProfileModal from '../components/EditProfileModal';
import DeleteAccountModal from '../components/DeleteAccountModal';

const ProfilePage = () => {
    const { user } = useAuth();
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return (
        <div className="page-wrapper">
            <section className="section">
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div className="glass-card" style={{ padding: '32px', marginTop: '32px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '12px' }}>
                            <h1 style={{ margin: 0 }}>Profile Settings</h1>
                            <button
                                type="button"
                                className="btn btn-primary btn-sm"
                                onClick={() => setShowEditModal(true)}
                            >
                                ✏️ Edit Profile
                            </button>
                        </div>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                            Your account details and preferences.
                        </p>

                        <div style={{ display: 'grid', rowGap: '16px' }}>
                            <div>
                                <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>
                                    Name
                                </div>
                                <div style={{ marginTop: '4px', fontWeight: 600 }}>{user?.name || 'Unknown user'}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>
                                    Email
                                </div>
                                <div style={{ marginTop: '4px', fontWeight: 600 }}>{user?.email || 'Not available'}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>
                                    Role
                                </div>
                                <div style={{ marginTop: '4px', textTransform: 'capitalize', fontWeight: 600 }}>{user?.role || 'student'}</div>
                            </div>
                        </div>

                        {/* Danger Zone */}
                        <div
                            style={{
                                marginTop: '36px',
                                paddingTop: '28px',
                                borderTop: '1px solid var(--border)',
                            }}
                        >
                            <div
                                className="card"
                                style={{
                                    padding: '24px',
                                    border: '1px solid rgba(255, 107, 107, 0.3)',
                                    background: 'rgba(255, 107, 107, 0.04)',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                    <span style={{ fontSize: '1.3rem' }}>⚠️</span>
                                    <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)', margin: 0, fontSize: '1.1rem' }}>
                                        Danger Zone
                                    </h3>
                                </div>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px' }}>
                                    This permanently deletes your account and your uploaded notes. This action cannot be undone.
                                </p>
                                <div>
                                    <button
                                        type="button"
                                        className="btn"
                                        style={{
                                            background: 'var(--accent)',
                                            color: '#fff',
                                            boxShadow: '0 4px 16px rgba(255, 107, 107, 0.25)',
                                        }}
                                        onClick={() => setShowDeleteModal(true)}
                                    >
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <EditProfileModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                currentUser={user}
            />

            <DeleteAccountModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
            />
        </div>
    );
};

export default ProfilePage;

