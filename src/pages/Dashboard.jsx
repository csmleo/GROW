import { useState } from 'react';
import { Link } from 'react-router-dom';
import { dashboardStats, myUploads, myPurchases } from '../data/dummyData';
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
    { month: 'Sep', amount: 820 },
    { month: 'Oct', amount: 1200 },
    { month: 'Nov', amount: 980 },
    { month: 'Dec', amount: 1540 },
    { month: 'Jan', amount: 2100 },
    { month: 'Feb', amount: 3240 },
];

const maxEarning = Math.max(...monthlyEarnings.map((m) => m.amount));

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState(TAB_OVERVIEW);

    const stats = dashboardStats;

    return (
        <div className="page-wrapper">
            {/* Header */}
            <div className="dashboard-header">
                <div className="orb orb-purple dash-orb-1" />
                <div className="container dashboard-header-inner">
                    <div className="dash-welcome">
                        <div className="dash-user-avatar">PS</div>
                        <div>
                            <h1 className="heading-md">Welcome back, <span className="text-gradient">Priya</span> 👋</h1>
                            <p className="dash-user-meta">Student Creator · Member since Jan 2025</p>
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
                                <div className="dash-stat-icon-wrap" style={{ background: 'rgba(108,71,255,0.15)' }}>💰</div>
                                <div className="dash-stat-info">
                                    <div className="dash-stat-label">Total Earnings</div>
                                    <div className="dash-stat-value">₹{stats.totalEarnings.toLocaleString()}</div>
                                </div>
                                <div className="dash-stat-trend positive">+23% ↑</div>
                            </div>
                            <div className="dash-stat-card card">
                                <div className="dash-stat-icon-wrap" style={{ background: 'rgba(0,212,170,0.15)' }}>📅</div>
                                <div className="dash-stat-info">
                                    <div className="dash-stat-label">This Month</div>
                                    <div className="dash-stat-value">₹{stats.thisMonthEarnings.toLocaleString()}</div>
                                </div>
                                <div className="dash-stat-trend positive">+54% ↑</div>
                            </div>
                            <div className="dash-stat-card card">
                                <div className="dash-stat-icon-wrap" style={{ background: 'rgba(255,201,71,0.15)' }}>📤</div>
                                <div className="dash-stat-info">
                                    <div className="dash-stat-label">Uploads</div>
                                    <div className="dash-stat-value">{stats.totalUploads}</div>
                                </div>
                                <div className="dash-stat-trend">notes live</div>
                            </div>
                            <div className="dash-stat-card card">
                                <div className="dash-stat-icon-wrap" style={{ background: 'rgba(255,107,107,0.15)' }}>🛒</div>
                                <div className="dash-stat-info">
                                    <div className="dash-stat-label">Purchases</div>
                                    <div className="dash-stat-value">{stats.totalPurchases}</div>
                                </div>
                                <div className="dash-stat-trend">notes bought</div>
                            </div>
                            <div className="dash-stat-card card">
                                <div className="dash-stat-icon-wrap" style={{ background: 'rgba(108,71,255,0.15)' }}>⬇️</div>
                                <div className="dash-stat-info">
                                    <div className="dash-stat-label">Total Downloads</div>
                                    <div className="dash-stat-value">{stats.totalDownloads.toLocaleString()}</div>
                                </div>
                                <div className="dash-stat-trend positive">of your notes</div>
                            </div>
                            <div className="dash-stat-card card payout-card">
                                <div className="dash-stat-icon-wrap" style={{ background: 'rgba(0,212,170,0.15)' }}>🏦</div>
                                <div className="dash-stat-info">
                                    <div className="dash-stat-label">Pending Payout</div>
                                    <div className="dash-stat-value">₹{stats.pendingPayout.toLocaleString()}</div>
                                </div>
                                <button className="btn btn-success btn-sm">Withdraw</button>
                            </div>
                        </div>

                        {/* Earnings Chart */}
                        <div className="dash-earnings-chart card">
                            <div className="chart-header">
                                <h3 className="chart-title">Monthly Earnings</h3>
                                <span className="badge badge-success">Last 6 months</span>
                            </div>
                            <div className="bar-chart">
                                {monthlyEarnings.map((m) => (
                                    <div key={m.month} className="bar-column">
                                        <div className="bar-amount">₹{m.amount}</div>
                                        <div
                                            className="bar-fill"
                                            style={{ height: `${(m.amount / maxEarning) * 180}px` }}
                                        />
                                        <div className="bar-month">{m.month}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Grid */}
                        <div className="dash-quick-grid">
                            {/* Recent Purchases */}
                            <div className="card dash-mini-card">
                                <div className="mini-card-header">
                                    <h3 className="mini-card-title">Recent Purchases</h3>
                                    <button className="link-btn" onClick={() => setActiveTab(TAB_PURCHASES)}>View all →</button>
                                </div>
                                <div className="mini-list">
                                    {myPurchases.slice(0, 3).map((p) => (
                                        <div key={p.id} className="mini-list-item">
                                            <div className="mini-item-icon">📄</div>
                                            <div className="mini-item-info">
                                                <div className="mini-item-title">{p.title}</div>
                                                <div className="mini-item-sub">{p.subject} · ₹{p.price}</div>
                                            </div>
                                            <button className="btn btn-ghost btn-sm">Open</button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Top Uploads */}
                            <div className="card dash-mini-card">
                                <div className="mini-card-header">
                                    <h3 className="mini-card-title">Top Uploads</h3>
                                    <button className="link-btn" onClick={() => setActiveTab(TAB_UPLOADS)}>View all →</button>
                                </div>
                                <div className="mini-list">
                                    {myUploads.filter((u) => u.status === 'active').slice(0, 3).map((u) => (
                                        <div key={u.id} className="mini-list-item">
                                            <div className="mini-item-icon">📚</div>
                                            <div className="mini-item-info">
                                                <div className="mini-item-title">{u.title}</div>
                                                <div className="mini-item-sub">{u.sales} sales · ₹{u.earnings}</div>
                                            </div>
                                            <span className="badge badge-success">Live</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
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
                                            <span>{new Date(p.purchaseDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                        </div>
                                        <div className="purchase-price">₹{p.price}</div>
                                    </div>
                                    <div className="purchase-actions">
                                        <button className="btn btn-primary btn-sm">⬇ Download</button>
                                        <button className="btn btn-ghost btn-sm">★ Review</button>
                                    </div>
                                </div>
                            ))}
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

                        <div className="uploads-table-wrap card">
                            <table className="uploads-table">
                                <thead>
                                    <tr>
                                        <th>Note Title</th>
                                        <th>Subject</th>
                                        <th>Price</th>
                                        <th>Sales</th>
                                        <th>Earnings</th>
                                        <th>Rating</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myUploads.map((u) => (
                                        <tr key={u.id}>
                                            <td className="upload-row-title">{u.title}</td>
                                            <td><span className="badge badge-primary">{u.subject}</span></td>
                                            <td>{u.price === 0 ? <span className="price-free">Free</span> : `₹${u.price}`}</td>
                                            <td className="upload-sales">{u.sales}</td>
                                            <td className="upload-earnings">₹{u.earnings.toLocaleString()}</td>
                                            <td>
                                                <span className="upload-rating">⭐ {u.rating}</span>
                                            </td>
                                            <td>
                                                <span className={`badge ${u.status === 'active' ? 'badge-success' : 'badge-primary'}`}>
                                                    {u.status === 'active' ? '✓ Live' : '✎ Draft'}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="upload-row-actions">
                                                    <button className="btn btn-ghost btn-sm">Edit</button>
                                                    <button className="btn btn-ghost btn-sm" style={{ color: 'var(--accent)' }}>Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
                                <div className="earn-sum-value text-gradient">₹{stats.totalEarnings.toLocaleString()}</div>
                                <div className="earn-sum-sub">across {stats.totalUploads} uploads</div>
                            </div>
                            <div className="earn-summary-card card">
                                <div className="earn-sum-label">Available for Payout</div>
                                <div className="earn-sum-value" style={{ color: 'var(--secondary)' }}>₹{stats.pendingPayout.toLocaleString()}</div>
                                <button className="btn btn-success" style={{ marginTop: '12px' }}>Withdraw Now</button>
                            </div>
                            <div className="earn-summary-card card">
                                <div className="earn-sum-label">This Month's Earnings</div>
                                <div className="earn-sum-value" style={{ color: 'var(--gold)' }}>₹{stats.thisMonthEarnings.toLocaleString()}</div>
                                <div className="earn-sum-sub">+54% from last month</div>
                            </div>
                        </div>

                        {/* Earnings Chart */}
                        <div className="dash-earnings-chart card" style={{ marginTop: '28px' }}>
                            <div className="chart-header">
                                <h3 className="chart-title">Earnings History</h3>
                            </div>
                            <div className="bar-chart">
                                {monthlyEarnings.map((m) => (
                                    <div key={m.month} className="bar-column">
                                        <div className="bar-amount">₹{m.amount}</div>
                                        <div className="bar-fill" style={{ height: `${(m.amount / maxEarning) * 180}px` }} />
                                        <div className="bar-month">{m.month}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Per-upload breakdown */}
                        <div className="card earnings-breakdown-card" style={{ marginTop: '28px' }}>
                            <div className="chart-header" style={{ padding: '20px 24px 0' }}>
                                <h3 className="chart-title">Earnings per Note</h3>
                            </div>
                            <div style={{ padding: '20px 24px' }}>
                                {myUploads.map((u) => (
                                    <div key={u.id} className="breakdown-row">
                                        <div className="breakdown-info">
                                            <div className="breakdown-title">{u.title}</div>
                                            <div className="breakdown-meta">{u.sales} sales</div>
                                        </div>
                                        <div className="breakdown-bar-wrap">
                                            <div
                                                className="breakdown-bar"
                                                style={{ width: `${(u.earnings / 6566) * 100}%` }}
                                            />
                                        </div>
                                        <div className="breakdown-amount">₹{u.earnings.toLocaleString()}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
