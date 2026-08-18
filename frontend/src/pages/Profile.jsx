import { useAuth } from '../context/AuthContext.jsx';

const ProfilePage = () => {
    const { user } = useAuth();

    return (
        <div className="page-wrapper">
            <section className="section">
                <div className="container">
                    <div className="glass-card" style={{ padding: '32px', marginTop: '32px' }}>
                        <h1 style={{ marginBottom: '8px' }}>Profile</h1>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                            Your account details from your GROW profile.
                        </p>

                        <div style={{ display: 'grid', rowGap: '12px' }}>
                            <div>
                                <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                                    Name
                                </div>
                                <div>{user?.name || 'Unknown user'}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                                    Email
                                </div>
                                <div>{user?.email || 'Not available'}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                                    Role
                                </div>
                                <div>{user?.role || 'Not set'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProfilePage;

