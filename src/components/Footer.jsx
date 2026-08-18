import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            {/* Top gradient line */}
            <div className="footer-top-line" />

            <div className="container">
                <div className="footer-grid">
                    {/* Brand */}
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <div className="footer-logo-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className="footer-logo-text">GROW Notes</span>
                        </Link>
                        <p className="footer-tagline">
                            Empowering students to share knowledge and earn while they learn.
                        </p>
                        <div className="footer-socials">
                            {['Twitter', 'Instagram', 'LinkedIn', 'YouTube'].map((s) => (
                                <a key={s} href="#" className="social-icon" aria-label={s}>
                                    {s[0]}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="footer-links-group">
                        <h4 className="footer-links-title">Marketplace</h4>
                        <ul className="footer-links-list">
                            <li><Link to="/browse">Browse Notes</Link></li>
                            <li><Link to="/upload">Upload Notes</Link></li>
                            <li><Link to="/browse">Free Notes</Link></li>
                            <li><Link to="/browse">Top Rated</Link></li>
                        </ul>
                    </div>

                    <div className="footer-links-group">
                        <h4 className="footer-links-title">Company</h4>
                        <ul className="footer-links-list">
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">How It Works</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Blog</a></li>
                        </ul>
                    </div>

                    <div className="footer-links-group">
                        <h4 className="footer-links-title">Support</h4>
                        <ul className="footer-links-list">
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="footer-newsletter">
                    <div className="newsletter-left">
                        <h4 className="newsletter-title">Get study tips & new notes alerts</h4>
                        <p className="newsletter-sub">Join 50,000+ students in our newsletter.</p>
                    </div>
                    <div className="newsletter-form">
                        <input
                            type="email"
                            placeholder="Enter your email…"
                            className="form-input newsletter-input"
                        />
                        <button className="btn btn-primary">Subscribe</button>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="footer-bottom">
                    <p className="footer-copy">
                        © 2026 GROW – Online Student Notes Marketplace. All rights reserved.
                    </p>
                    <div className="footer-bottom-links">
                        <a href="#">Privacy</a>
                        <a href="#">Terms</a>
                        <a href="#">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
