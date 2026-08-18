import { Link } from 'react-router-dom';

const socialLinks = [
    { label: 'Twitter', href: 'https://twitter.com', icon: '𝕏' },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'in' },
    { label: 'Instagram', href: 'https://instagram.com', icon: '📷' },
    { label: 'YouTube', href: 'https://youtube.com', icon: '▶' },
];

const Footer = () => (
    <footer className="footer">
        <div className="container">
            <div className="footer-grid">
                <div className="footer-brand">
                    <div className="footer-logo">📚 GROW</div>
                    <p className="footer-tagline">
                        Global Resource for Online Wisdom — empowering students to share knowledge and earn while they learn.
                    </p>
                    <div className="footer-social">
                        {socialLinks.map((s) => (
                            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="footer-links">
                    <h4>Marketplace</h4>
                    <ul>
                        <li><Link to="/browse">Browse Notes</Link></li>
                        <li><Link to="/upload">Upload Notes</Link></li>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                    </ul>
                </div>

                <div className="footer-links">
                    <h4>Categories</h4>
                    <ul>
                        <li><Link to="/browse?category=Programming">Programming</Link></li>
                        <li><Link to="/browse?category=DBMS">DBMS</Link></li>
                        <li><Link to="/browse?category=AI">AI</Link></li>
                        <li><Link to="/browse?category=Cybersecurity">Cybersecurity</Link></li>
                    </ul>
                </div>

                <div className="footer-links">
                    <h4>Account</h4>
                    <ul>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Sign Up</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                © 2026 GROW – Global Resource for Online Wisdom. Built for students, by students.
            </div>
        </div>
    </footer>
);

export default Footer;
