import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import './Navbar.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const { isAuthenticated, user, logout } = useAuth();

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/browse', label: 'Browse Notes' },
        { path: '/upload', label: 'Upload Notes' },
        { path: '/dashboard', label: 'Dashboard' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar">
            <div className="container navbar-inner">
                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    <div className="logo-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="logo-text">
                        <span className="logo-main">GROW</span>
                        <span className="logo-sub">Notes Marketplace</span>
                    </div>
                </Link>

                {/* Desktop Nav Links */}
                <ul className="navbar-links hide-mobile">
                    {navLinks.map(({ path, label }) => (
                        <li key={path}>
                            <Link to={path} className={`nav-link ${isActive(path) ? 'active' : ''}`}>
                                {label}
                                {isActive(path) && <span className="nav-active-dot" />}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Auth Buttons */}
                <div className="navbar-actions hide-mobile">
                    {isAuthenticated ? (
                        <>
                            <span className="nav-user">
                                {user?.name ? `Hi, ${user.name}` : 'Logged in'}
                            </span>
                            <button type="button" className="btn btn-ghost btn-sm" onClick={logout}>
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-ghost btn-sm">Log In</Link>
                            <Link to="/signup" className="btn btn-primary btn-sm">Sign Up Free</Link>
                        </>
                    )}
                </div>

                {/* Mobile hamburger */}
                <button
                    className="hamburger hide-desktop"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
                    <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
                    <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="mobile-menu">
                    {navLinks.map(({ path, label }) => (
                        <Link
                            key={path}
                            to={path}
                            className={`mobile-nav-link ${isActive(path) ? 'active' : ''}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            {label}
                        </Link>
                    ))}
                    <div className="mobile-auth">
                        {isAuthenticated ? (
                            <>
                                <span className="nav-user">
                                    {user?.name ? `Hi, ${user.name}` : 'Logged in'}
                                </span>
                                <button
                                    type="button"
                                    className="btn btn-ghost"
                                    onClick={() => {
                                        logout();
                                        setMenuOpen(false);
                                    }}
                                >
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-ghost" onClick={() => setMenuOpen(false)}>Log In</Link>
                                <Link to="/signup" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Sign Up Free</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
