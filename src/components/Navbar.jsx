import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';

const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/browse', label: 'Browse Notes' },
    { path: '/upload', label: 'Upload' },
    { path: '/dashboard', label: 'Dashboard' },
];

const Navbar = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [navSearch, setNavSearch] = useState('');
    const dropdownRef = useRef(null);

    const initials = user?.name
        ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
        : '?';

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleNavSearch = (value) => {
        setNavSearch(value);
        if (value.trim()) {
            navigate(`/browse?search=${encodeURIComponent(value.trim())}`);
        }
    };

    const handleLogout = () => {
        setProfileOpen(false);
        setMenuOpen(false);
        logout();
    };

    return (
        <nav className="navbar">
            <div className="container navbar-inner">
                <Link to="/" className="navbar-logo">
                    <div className="logo-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    GROW
                </Link>

                <div className="navbar-search hide-mobile">
                    <SearchBar
                        id="navbar-search"
                        value={navSearch}
                        onChange={handleNavSearch}
                        placeholder="Search notes…"
                    />
                </div>

                <ul className="navbar-links hide-mobile">
                    {navLinks.map(({ path, label }) => (
                        <li key={path}>
                            <Link to={path} className={`nav-link ${pathname === path ? 'active' : ''}`}>
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="navbar-actions">
                    <ThemeToggle />

                    {isAuthenticated ? (
                        <div className="profile-dropdown-wrap" ref={dropdownRef}>
                            <button
                                type="button"
                                className="profile-trigger hide-mobile"
                                onClick={() => setProfileOpen(!profileOpen)}
                            >
                                <span className="profile-avatar">{initials}</span>
                                <span>{user?.name?.split(' ')[0] || 'Account'}</span>
                                <span>▾</span>
                            </button>
                            {profileOpen && (
                                <div className="profile-menu">
                                    <div style={{ padding: '8px 14px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                        {user?.email}
                                    </div>
                                    <Link to="/dashboard" className="profile-menu-item" onClick={() => setProfileOpen(false)}>
                                        📊 Dashboard
                                    </Link>
                                    <Link to="/profile" className="profile-menu-item" onClick={() => setProfileOpen(false)}>
                                        👤 Profile
                                    </Link>
                                    <Link to="/upload" className="profile-menu-item" onClick={() => setProfileOpen(false)}>
                                        📤 Upload Notes
                                    </Link>
                                    <button type="button" className="profile-menu-item danger" onClick={handleLogout}>
                                        🚪 Log Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-ghost btn-sm hide-mobile">Log In</Link>
                            <Link to="/signup" className="btn btn-primary btn-sm hide-mobile">Sign Up Free</Link>
                        </>
                    )}

                    <button
                        type="button"
                        className="hamburger-btn"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className="hamburger-line" />
                        <span className="hamburger-line" />
                        <span className="hamburger-line" />
                    </button>
                </div>
            </div>

            <div className={`mobile-nav-panel ${menuOpen ? 'open' : ''}`}>
                <SearchBar value={navSearch} onChange={handleNavSearch} placeholder="Search notes…" />
                {navLinks.map(({ path, label }) => (
                    <Link
                        key={path}
                        to={path}
                        className={`nav-link ${pathname === path ? 'active' : ''}`}
                        onClick={() => setMenuOpen(false)}
                    >
                        {label}
                    </Link>
                ))}
                {isAuthenticated ? (
                    <>
                        <Link to="/profile" className="nav-link" onClick={() => setMenuOpen(false)}>Profile</Link>
                        <button type="button" className="btn btn-ghost btn-sm" onClick={handleLogout}>Log Out</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn btn-ghost btn-sm" onClick={() => setMenuOpen(false)}>Log In</Link>
                        <Link to="/signup" className="btn btn-primary btn-sm" onClick={() => setMenuOpen(false)}>Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
