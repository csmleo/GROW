import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { useAuth } from '../context/AuthContext.jsx';
import './Auth.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const redirectTo = location.state?.from?.pathname || '/dashboard';
    const [form, setForm] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password) { setError('Please fill in all fields.'); return; }
        setLoading(true);
        try {
            const { data } = await loginUser(form);
            if (!data?.success || !data?.token) {
                setError(data?.message || 'Login failed. Please try again.');
                return;
            }
            login(data);
            navigate(redirectTo, { replace: true });
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-wrapper page-wrapper">
            <div className="orb orb-purple auth-orb-1" />
            <div className="orb orb-teal   auth-orb-2" />

            <div className="auth-container">
                {/* Left panel */}
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
                    <h2 className="auth-left-title">Your Knowledge Hub Awaits</h2>
                    <p className="auth-left-sub">
                        Access thousands of student notes, study resources, and start earning from your own knowledge.
                    </p>
                    <div className="auth-features">
                        {[
                            { icon: '📚', text: '12,000+ quality notes' },
                            { icon: '💰', text: 'Earn from your uploads' },
                            { icon: '🎓', text: 'Student community' },
                            { icon: '🔒', text: 'Secure payments' },
                        ].map((f, i) => (
                            <div key={i} className="auth-feature">
                                <span>{f.icon}</span><span>{f.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right panel – form */}
                <div className="auth-right">
                    <div className="auth-card glass-card">
                        <div className="auth-form-header">
                            <h1>Welcome back 👋</h1>
                            <p>Log in to your GROW account</p>
                        </div>

                        {error && <div className="alert alert-error">⚠️ {error}</div>}

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-group">
                                <label htmlFor="login-email" className="form-label">Email Address</label>
                                <input
                                    id="login-email" name="email" type="email"
                                    placeholder="yourname@college.edu"
                                    className="form-input"
                                    value={form.email} onChange={handleChange}
                                    autoComplete="email"
                                />
                            </div>

                            <div className="form-group">
                                <div className="form-label-row">
                                    <label htmlFor="login-password" className="form-label">Password</label>
                                    <a href="#" className="forgot-link">Forgot password?</a>
                                </div>
                                <div className="input-pw-wrap">
                                    <input
                                        id="login-password" name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        className="form-input"
                                        value={form.password} onChange={handleChange}
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button" className="pw-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label="Toggle password visibility"
                                    >
                                        {showPassword ? '🙈' : '👁️'}
                                    </button>
                                </div>
                            </div>

                            <button
                                id="login-btn" type="submit"
                                className="btn btn-primary btn-lg auth-submit"
                                disabled={loading}
                            >
                                {loading ? <><span className="spinner" /> Logging in…</> : 'Log In'}
                            </button>
                        </form>

                        <p className="auth-switch">
                            Don't have an account?{' '}
                            <Link to="/signup" className="auth-switch-link">Sign up free →</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
