import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { getMyNotes } from '../services/noteService';
import { myPurchases } from '../data/dummyData';
import EmptyState from '../components/EmptyState';
import './Dashboard.css';

const TAB_OVERVIEW = 'overview';
const TAB_PURCHASES = 'purchases';
const TAB_UPLOADS = 'uploads';
const TAB_EARNINGS = 'earnings';

const tabs = [
    { id: TAB_OVERVIEW, label: '🏠 Overview' },
    { id: TAB_PURCHASES, label: '🛒 Purchases' },
    { id: TAB_UPLOADS, label: '📤 My Uploads' },
    { id: TAB_EARNINGS, label: '💰 Earnings' },
];

const monthlyEarnings = [
    { month: 'Sep', amount: 0 },
    { month: 'Oct', amount: 0 },
    { month: 'Nov', amount: 0 },
    { month: 'Dec', amount: 0 },
    { month: 'Jan', amount: 0 },
    { month: 'Feb', amount: 0 },
];

const initialsFromName = (name = '') =>
    name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() || '')
        .join('') || 'ST';

const DashboardPage = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState(TAB_OVERVIEW);
    const [myNotes, setMyNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let cancelled = false;

        const fetchMyNotes = async () => {
            setLoading(true);
            setError('');
            try {
                const { data } = await getMyNotes();
                if (cancelled) return;
                if (data?.success && Array.isArray(data.notes)) {
                    setMyNotes(data.notes);
                } else {
                    setMyNotes([]);
                }
            } catch {
                if (!cancelled) {
                    setError('Unable to load your uploads. Please try again later.');
                    setMyNotes([]);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchMyNotes();
        return () => {
            cancelled = true;
        };
    }, []);

    const totalUploads = myNotes.length;
    const totalDownloads = myNotes.reduce((sum, n) => sum + (n.downloads || 0), 0);
    const totalEarnings = myNotes.reduce(
        (sum, n) => sum + (n.downloads || 0) * (n.price || 0) * 0.8,
        0
    );

    const userName = user?.name || 'Student';
    const userAvatar = initialsFromName(userName);

    return (
        <div className="page-wrapper">
            {/* Header */}
            <div className="dashboard-header">
                <div className="orb orb-purple dash-orb-1" />
                <div className="container dashboard-header-inner">
                    <div className="dash-welcome">
                        <div className="dash-user-avatar">{userAvatar}</div>
                        <div>
                            <h1 className="heading-md">
                                Welcome back, <span className="text-gradient">{userName}</span> 👋
                            </h1>
                            <p className="dash-user-meta">
                                {user?.role === 'creator' ? 'Student Creator' : 'Student'} · Member since {user?.createdAt ? new Date(user.createdAt).getFullYear() : '2025'}
                            </p>
                        </div>
                    </div>
                    <div className="dash-header-actions">
                        <Link to="/upload" className="btn btn-primary">
                            + Upload Notes
                        </Link>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="dashboard-tabs-wrap">
                <div className="container">
                    <div className="dashboard-tabs">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                id={`tab-${tab.id}`}
                                className={`dash-tab ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                                {tab.id === TAB_UPLOADS && totalUploads > 0 && (
                                    <span style={{ marginLeft: 6, opacity: 0.8, fontSize: '0.8rem' }}>
                                        ({totalUploads})
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container dashboard-body">
                {/* ── OVERVIEW TAB ── */}
                {activeTab === TAB_OVERVIEW && (
                    <div className="tab-content animate-fade">
                        {/* Stats Grid */}
                        <div className="dashboard-stats-grid">
                            <div className="dash-stat-card card">
                                <div className="dash-stat-icon-wrap" style={{ background: 'rgba(255,201,71,0.15)' }}>📤</div>
                                <div className="dash-stat-info">
                                    <div className="dash-stat-label">Your Uploads</div>
                                    <div className="dash-stat-value">{totalUploads}</div>
                                </div>
                                <div className="dash-stat-trend">notes live</div>
                            </div>
                            <div className="dash-stat-card card">
                                <div className="dash-stat-icon-wrap" style={{ background: 'rgba(108,71,255,0.15)' }}>⬇️</div>
                                <div className="dash-stat-info">
                                    <div className="dash-stat-label">Total Downloads</div>
                                    <div className="dash-stat-value">{totalDownloads.toLocaleString()}</div>
                                </div>
                                <div className="dash-stat-trend positive">of your notes</div>
                            </div>
                            <div className="dash-stat-card card">
                                <div className="dash-stat-icon-wrap" style={{ background: 'rgba(0,212,170,0.15)' }}>💰</div>
                                <div className="dash-stat-info">
                                    <div className="dash-stat-label">Total Earnings</div>
                                    <div className="dash-stat-value">₹{Math.round(totalEarnings).toLocaleString()}</div>
                                </div>
                                <div className="dash-stat-trend positive">from note sales</div>
                            </div>
                            <div className="dash-stat-card card">
                                <div className="dash-stat-icon-wrap" style={{ background: 'rgba(255,107,107,0.15)' }}>🛒</div>
                                <div className="dash-stat-info">
                                    <div className="dash-stat-label">Purchases</div>
                                    <div className="dash-stat-value">{myPurchases.length}</div>
                                </div>
                                <div className="dash-stat-trend">notes bought</div>
                            </div>
                            <div className="dash-stat-card card payout-card">
                                <div className="dash-stat-icon-wrap" style={{ background: 'rgba(0,212,170,0.15)' }}>🏦</div>
                                <div className="dash-stat-info">
                                    <div className="dash-stat-label">Available Balance</div>
                                    <div className="dash-stat-value">₹{Math.round(totalEarnings).toLocaleString()}</div>
                                </div>
                                <button className="btn btn-success btn-sm" disabled={totalEarnings <= 0}>
                                    Withdraw
                                </button>
                            </div>
                        </div>

                        {/* Quick Grid */}
                        <div className="dash-quick-grid">
                            {/* Top Uploads */}
                            <div className="card dash-mini-card">
                                <div className="mini-card-header">
                                    <h3 className="mini-card-title">My Recent Uploads</h3>
                                    <button className="link-btn" onClick={() => setActiveTab(TAB_UPLOADS)}>View all →</button>
                                </div>
                                <div className="mini-list">
                                    {loading ? (
                                        <div style={{ padding: 20, color: 'var(--text-muted)' }}>Loading uploads…</div>
                                    ) : myNotes.length > 0 ? (
                                        myNotes.slice(0, 4).map((note) => (
                                            <div key={note.id || note._id} className="mini-list-item">
                                                <div className="mini-item-icon">📄</div>
                                                <div className="mini-item-info">
                                                    <div className="mini-item-title">{note.title}</div>
                                                    <div className="mini-item-sub">
                                                        {note.subject} · {note.isFree ? 'Free' : `₹${note.price}`} · {note.downloads ?? 0} downloads
                                                    </div>
                                                </div>
                                                {note.fileUrl && (
                                                    <button
                                                        type="button"
                                                        className="btn btn-ghost btn-sm"
                                                        onClick={() => window.open(note.fileUrl, '_blank', 'noopener,noreferrer')}
                                                    >
                                                        Open PDF
                                                    </button>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <div style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)' }}>
                                            <p>No notes uploaded yet.</p>
                                            <Link to="/upload" className="btn btn-primary btn-sm" style={{ marginTop: 12 }}>
                                                + Upload Your First Notes
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Recent Purchases */}
                            <div className="card dash-mini-card">
                                <div className="mini-card-header">
                                    <h3 className="mini-card-title">Recent Purchases</h3>
                                    <button className="link-btn" onClick={() => setActiveTab(TAB_PURCHASES)}>View all →</button>
                                </div>
                                <div className="mini-list">
                                    {myPurchases.slice(0, 3).map((p) => (
                                        <div key={p.id} className="mini-list-item">
                                            <div className="mini-item-icon">📖</div>
                                            <div className="mini-item-info">
                                                <div className="mini-item-title">{p.title}</div>
                                                <div className="mini-item-sub">{p.subject} · ₹{p.price}</div>
                                            </div>
                                            <Link to="/browse" className="btn btn-ghost btn-sm">Browse</Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── UPLOADS TAB ── */}
                {activeTab === TAB_UPLOADS && (
                    <div className="tab-content animate-fade">
                        <div className="tab-section-header flex-between">
                            <div>
                                <h2 className="heading-md">My Uploads</h2>
                                <p className="tab-section-sub">Notes you've published to the marketplace</p>
                            </div>
                            <Link to="/upload" className="btn btn-primary">+ Upload New</Link>
                        </div>

                        {error && (
                            <p className="field-error" role="status">⚠ {error}</p>
                        )}

                        {loading ? (
                            <div className="card" style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
                                ⏳ Loading your uploaded notes…
                            </div>
                        ) : myNotes.length > 0 ? (
                            <div className="uploads-table-wrap card">
                                <table className="uploads-table">
                                    <thead>
                                        <tr>
                                            <th>Note Title</th>
                                            <th>Subject / Category</th>
                                            <th>Price</th>
                                            <th>Upload Date</th>
                                            <th>Type</th>
                                            <th>Downloads</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myNotes.map((note) => {
                                            const noteDate = note.uploadDate || note.createdAt;
                                            const formattedDate = noteDate
                                                ? new Date(noteDate).toLocaleDateString('en-IN', {
                                                      day: 'numeric',
                                                      month: 'short',
                                                      year: 'numeric',
                                                  })
                                                : '—';

                                            return (
                                                <tr key={note.id || note._id}>
                                                    <td className="upload-row-title">{note.title}</td>
                                                    <td>
                                                        <span className="badge badge-primary">
                                                            {note.category || note.subject}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        {note.isFree || note.price === 0 ? (
                                                            <span className="price-free">Free</span>
                                                        ) : (
                                                            `₹${note.price}`
                                                        )}
                                                    </td>
                                                    <td>{formattedDate}</td>
                                                    <td>
                                                        <span className="note-file-type">{note.fileType || 'PDF'}</span>
                                                    </td>
                                                    <td className="upload-sales">{note.downloads ?? 0}</td>
                                                    <td>
                                                        <span className="badge badge-success">✓ Live</span>
                                                    </td>
                                                    <td>
                                                        <div className="upload-row-actions">
                                                            {note.fileUrl ? (
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-primary btn-sm"
                                                                    onClick={() =>
                                                                        window.open(
                                                                            note.fileUrl,
                                                                            '_blank',
                                                                            'noopener,noreferrer'
                                                                        )
                                                                    }
                                                                >
                                                                    📄 Open PDF
                                                                </button>
                                                            ) : (
                                                                <span style={{ color: 'var(--text-muted)' }}>No File</span>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <EmptyState
                                icon="📤"
                                title="No notes uploaded yet"
                                message="Share your study notes with fellow students and start building your library."
                                actionLabel="+ Upload Your First Notes"
                                onAction={() => window.location.href = '/upload'}
                            />
                        )}
                    </div>
                )}

                {/* ── PURCHASES TAB ── */}
                {activeTab === TAB_PURCHASES && (
                    <div className="tab-content animate-fade">
                        <div className="tab-section-header">
                            <h2 className="heading-md">My Purchases</h2>
                            <p className="tab-section-sub">Notes you've bought and downloaded</p>
                        </div>
                        <div className="purchases-grid">
                            {myPurchases.map((p) => (
                                <div key={p.id} className="purchase-card card">
                                    <div className="purchase-icon">📖</div>
                                    <div className="purchase-info">
                                        <div className="badge badge-primary purchase-subject">{p.subject}</div>
                                        <h3 className="purchase-title">{p.title}</h3>
                                        <div className="purchase-meta">
                                            <span>by {p.author}</span>
                                            <span>·</span>
                                            <span>
                                                {new Date(p.purchaseDate).toLocaleDateString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}
                                            </span>
                                        </div>
                                        <div className="purchase-price">₹{p.price}</div>
                                    </div>
                                    <div className="purchase-actions">
                                        <Link to="/browse" className="btn btn-primary btn-sm">Browse More</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── EARNINGS TAB ── */}
                {activeTab === TAB_EARNINGS && (
                    <div className="tab-content animate-fade">
                        <div className="tab-section-header">
                            <h2 className="heading-md">Earnings & Payouts</h2>
                            <p className="tab-section-sub">Track your income and withdraw your earnings</p>
                        </div>

                        <div className="earnings-summary-grid">
                            <div className="earn-summary-card card">
                                <div className="earn-sum-label">Total Lifetime Earnings</div>
                                <div className="earn-sum-value text-gradient">
                                    ₹{Math.round(totalEarnings).toLocaleString()}
                                </div>
                                <div className="earn-sum-sub">across {totalUploads} uploads</div>
                            </div>
                            <div className="earn-summary-card card">
                                <div className="earn-sum-label">Available for Payout</div>
                                <div className="earn-sum-value" style={{ color: 'var(--secondary)' }}>
                                    ₹{Math.round(totalEarnings).toLocaleString()}
                                </div>
                                <button className="btn btn-success" style={{ marginTop: '12px' }} disabled={totalEarnings <= 0}>
                                    Withdraw Now
                                </button>
                            </div>
                            <div className="earn-summary-card card">
                                <div className="earn-sum-label">Total Downloads</div>
                                <div className="earn-sum-value" style={{ color: 'var(--gold)' }}>
                                    {totalDownloads.toLocaleString()}
                                </div>
                                <div className="earn-sum-sub">of your study materials</div>
                            </div>
                        </div>

                        {/* Per-upload breakdown */}
                        {myNotes.length > 0 && (
                            <div className="card earnings-breakdown-card" style={{ marginTop: '28px' }}>
                                <div className="chart-header" style={{ padding: '20px 24px 0' }}>
                                    <h3 className="chart-title">Earnings per Note</h3>
                                </div>
                                <div style={{ padding: '20px 24px' }}>
                                    {myNotes.map((u) => {
                                        const noteEarn = (u.downloads || 0) * (u.price || 0) * 0.8;
                                        return (
                                            <div key={u.id || u._id} className="breakdown-row">
                                                <div className="breakdown-info">
                                                    <div className="breakdown-title">{u.title}</div>
                                                    <div className="breakdown-meta">{u.downloads ?? 0} downloads</div>
                                                </div>
                                                <div className="breakdown-bar-wrap">
                                                    <div
                                                        className="breakdown-bar"
                                                        style={{ width: `${totalEarnings > 0 ? (noteEarn / totalEarnings) * 100 : 0}%` }}
                                                    />
                                                </div>
                                                <div className="breakdown-amount">₹{Math.round(noteEarn).toLocaleString()}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;
