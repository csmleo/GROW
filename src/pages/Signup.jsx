import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import { useAuth } from '../context/AuthContext.jsx';
import './Auth.css';

const ROLES = [
    { value: 'student', label: 'Student', desc: 'Browse & buy notes', icon: '🎓' },
    { value: 'creator', label: 'Note Creator', desc: 'Upload & earn money', icon: '✍️' },
    { value: 'both', label: 'Both', desc: 'Browse and earn', icon: '🚀' },
];

const SignupPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const redirectTo = location.state?.from?.pathname || '/dashboard';
    const [form, setForm] = useState({ name: '', email: '', password: '', role: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const validate = () => {
        if (!form.name.trim()) return 'Please enter your full name.';
        if (!form.email.includes('@')) return 'Please enter a valid email.';
        if (form.password.length < 6) return 'Password must be at least 6 characters.';
        if (!form.role) return 'Please select your role.';
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = validate();
        if (err) { setError(err); return; }
        setLoading(true);
        try {
            const { data } = await registerUser(form);
            if (!data?.success || !data?.token) {
                setError(data?.message || 'Registration failed. Please try again.');
                return;
            }
            login(data);
            navigate(redirectTo, { replace: true });
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const pwStrength = Math.min(4, Math.floor(form.password.length / 2));

    return (
        <div className="auth-wrapper page-wrapper">
            <div className="orb orb-purple auth-orb-1" />
            <div className="orb orb-teal   auth-orb-2" />

            <div className="auth-container auth-container-signup">
                {/* Left */}
                <div className="auth-left">
                    <Link to="/" className="auth-logo-link">
                        <div className="logo-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                                    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span className="auth-logo-text">GROW</span>
                    </Link>
                    <h2 className="auth-left-title">Join 50,000+ Students</h2>
                    <p className="auth-left-sub">
                        Create your free account and start sharing knowledge or finding the perfect study materials.
                    </p>
                    <div className="auth-earn-stat">
                        <span className="earn-icon">💰</span>
                        <div>
                            <div className="earn-val">₹18,000</div>
                            <div className="earn-meta">Average monthly earnings by top creators</div>
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div className="auth-right">
                    <div className="auth-card glass-card">
                        <div className="auth-form-header">
                            <h1>Create your account ✨</h1>
                            <p>Free forever. No credit card required.</p>
                        </div>

                        {error && <div className="alert alert-error">⚠️ {error}</div>}

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-group">
                                <label htmlFor="signup-name" className="form-label">Full Name</label>
                                <input
                                    id="signup-name" name="name" type="text"
                                    placeholder="e.g. Priya Sharma"
                                    className="form-input"
                                    value={form.name} onChange={handleChange}
                                    autoComplete="name"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="signup-email" className="form-label">Email Address</label>
                                <input
                                    id="signup-email" name="email" type="email"
                                    placeholder="yourname@college.edu"
                                    className="form-input"
                                    value={form.email} onChange={handleChange}
                                    autoComplete="email"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="signup-password" className="form-label">Password</label>
                                <div className="input-pw-wrap">
                                    <input
                                        id="signup-password" name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Minimum 6 characters"
                                        className="form-input"
                                        value={form.password} onChange={handleChange}
                                        autoComplete="new-password"
                                    />
                                    <button
                                        type="button" className="pw-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label="Toggle password visibility"
                                    >
                                        {showPassword ? '🙈' : '👁️'}
                                    </button>
                                </div>
                                {/* Strength bars */}
                                <div className="pw-strength">
                                    {[...Array(4)].map((_, i) => (
                                        <span key={i} className={`strength-bar ${i < pwStrength ? 'active' : ''}`} />
                                    ))}
                                </div>
                            </div>

                            {/* Role Selection */}
                            <div className="form-group">
                                <label className="form-label">I want to…</label>
                                <div className="role-grid">
                                    {ROLES.map((r) => (
                                        <button
                                            key={r.value} type="button"
                                            id={`role-${r.value}`}
                                            className={`role-card ${form.role === r.value ? 'selected' : ''}`}
                                            onClick={() => setForm({ ...form, role: r.value })}
                                        >
                                            <span className="role-icon">{r.icon}</span>
                                            <span className="role-label">{r.label}</span>
                                            <span className="role-desc">{r.desc}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                id="signup-btn" type="submit"
                                className="btn btn-primary btn-lg auth-submit"
                                disabled={loading}
                            >
                                {loading
                                    ? <><span className="spinner" /> Creating account…</>
                                    : 'Create Free Account →'}
                            </button>
                        </form>

                        <p className="auth-switch">
                            Already have an account?{' '}
                            <Link to="/login" className="auth-switch-link">Log in →</Link>
                        </p>
                        <p className="auth-terms">
                            By signing up, you agree to our{' '}
                            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
