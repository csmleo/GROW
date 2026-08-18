import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import TrendingNotes from '../components/TrendingNotes';
import { dashboardStats, platformStats, dummyNotes } from '../data/dummyData';
import { getTrendingNotes } from '../utils/notesUtils';
import { useBookmarks } from '../context/BookmarkContext.jsx';
import './Dashboard.css';

const DashboardPage = () => {
    const { user } = useAuth();
    const { bookmarks } = useBookmarks();
    const trending = getTrendingNotes(dummyNotes, 3);

    const statCards = [
        { icon: '📚', label: 'Total Notes', value: platformStats.totalNotes.toLocaleString() },
        { icon: '⬇️', label: 'Total Downloads', value: platformStats.totalDownloads.toLocaleString() },
        { icon: '📤', label: 'Your Uploads', value: dashboardStats.totalUploads },
        { icon: '👥', label: 'Active Users', value: platformStats.activeUsers.toLocaleString() },
    ];

    return (
        <div className="page-wrapper dashboard-page">
            <section className="dashboard-hero">
                <div className="orb orb-purple" style={{ width: 300, height: 300, top: -100, right: -80 }} />
                <div className="container">
                    <div className="dashboard-welcome glass-card" style={{ padding: '28px 32px' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Welcome back,</p>
                        <h1>{user?.name || 'Student'} 👋</h1>
                        <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>
                            {user?.role === 'creator' ? 'Keep uploading to grow your earnings!' : 'Explore notes or start sharing your knowledge.'}
                        </p>
                    </div>

                    <div className="dashboard-stats-grid">
                        {statCards.map((s) => (
                            <div key={s.label} className="dash-stat-card glass-card">
                                <span className="dash-stat-icon">{s.icon}</span>
                                <span className="dash-stat-value">{s.value}</span>
                                <span className="dash-stat-label">{s.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="dashboard-grid-2">
                        <div className="dashboard-card glass-card">
                            <h3>💰 Your Earnings</h3>
                            <p style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--secondary)', margin: '12px 0' }}>
                                ₹{dashboardStats.totalEarnings.toLocaleString()}
                            </p>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                                ₹{dashboardStats.thisMonthEarnings.toLocaleString()} this month · {dashboardStats.totalPurchases} purchases
                            </p>
                            <Link to="/upload" className="btn btn-primary btn-sm" style={{ marginTop: 16 }}>
                                Upload New Notes →
                            </Link>
                        </div>

                        <div className="dashboard-card glass-card">
                            <h3>⚡ Quick Links</h3>
                            <ul className="quick-link-list">
                                <li><Link to="/browse">Browse Notes</Link></li>
                                <li><Link to="/upload">Upload Notes</Link></li>
                                <li><Link to="/profile">View Profile</Link></li>
                                <li>
                                    <Link to="/browse">
                                        🔖 Saved Bookmarks ({bookmarks.length})
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div style={{ marginTop: 40 }}>
                        <TrendingNotes
                            notes={trending}
                            title="📈 Recommended for You"
                            subtitle="Based on popularity in your subjects"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DashboardPage;
