import { Link } from 'react-router-dom';
import NoteCard from '../components/NoteCard';
import { dummyNotes } from '../data/dummyData';
import './Home.css';

const stats = [
    { value: '50K+', label: 'Students', icon: '🎓' },
    { value: '12K+', label: 'Notes Uploaded', icon: '📚' },
    { value: '₹2Cr+', label: 'Earned by Students', icon: '💰' },
    { value: '200+', label: 'Subjects Covered', icon: '🌐' },
];

const howItWorks = [
    {
        step: '01',
        title: 'Find Your Notes',
        desc: 'Search thousands of student-made notes by subject, topic, or keyword.',
        icon: '🔍',
    },
    {
        step: '02',
        title: 'Buy or Download Free',
        desc: 'Purchase premium notes at student-friendly prices or grab free ones instantly.',
        icon: '⬇️',
    },
    {
        step: '03',
        title: 'Upload & Earn',
        desc: 'Share your own notes and earn money every time another student downloads them.',
        icon: '💸',
    },
];

const testimonials = [
    {
        name: 'Riya Desai',
        course: 'B.Tech CSE, IIT Delhi',
        avatar: 'RD',
        text: 'I earned ₹18,000 in just 3 months by uploading my semester notes. Best side hustle for a student!',
        rating: 5,
    },
    {
        name: 'Mohit Agarwal',
        course: 'CA Aspirant, Mumbai',
        avatar: 'MA',
        text: 'The notes quality here is incredible. Found perfectly organized notes for my CA finals. Saved weeks of prep time.',
        rating: 5,
    },
    {
        name: 'Zara Khan',
        course: 'MBBS 2nd Year, AIIMS',
        avatar: 'ZK',
        text: 'Anatomy diagrams and pharma notes here are better than most textbooks. Absolutely love this platform!',
        rating: 5,
    },
];

const HomePage = () => {
    const featuredNotes = dummyNotes.filter((n) => n.isBestseller).slice(0, 4);
    const freeNotes = dummyNotes.filter((n) => n.isFree).slice(0, 3);

    return (
        <div className="page-wrapper">
            {/* ── HERO ── */}
            <section className="hero">
                {/* Background orbs */}
                <div className="orb orb-purple hero-orb-1" />
                <div className="orb orb-teal hero-orb-2" />

                <div className="container hero-container">
                    <div className="hero-content animate-fade-up">
                        <div className="hero-badge">
                            <span className="hero-badge-dot" />
                            🎓 #1 Student Notes Marketplace in India
                        </div>

                        <h1 className="heading-xl hero-title">
                            Learn Smarter,{' '}
                            <span className="text-gradient">Earn Together</span>
                            <br />with GROW</h1>

                        <p className="hero-subtitle">
                            Discover thousands of student-created notes, flashcards & study guides.
                            Buy, share, and earn — all in one place built for students, by students.
                        </p>

                        <div className="hero-actions">
                            <Link to="/browse" className="btn btn-primary btn-lg">
                                🚀 Explore Notes
                            </Link>
                            <Link to="/upload" className="btn btn-secondary btn-lg">
                                💸 Start Earning
                            </Link>
                        </div>

                        <div className="hero-trust">
                            <div className="trust-avatars">
                                {['A', 'B', 'C', 'D', 'E'].map((letter, i) => (
                                    <div key={i} className="trust-avatar" style={{ background: `hsl(${i * 60 + 200}, 70%, 55%)` }}>
                                        {letter}
                                    </div>
                                ))}
                            </div>
                            <p className="trust-text">
                                <strong>50,000+ students</strong> already learning with GROW
                            </p>
                        </div>
                    </div>

                    {/* Hero Visual */}
                    <div className="hero-visual animate-float">
                        <div className="hero-card-stack">
                            <div className="hero-float-card card-1">
                                <div className="hfc-icon">📐</div>
                                <div className="hfc-content">
                                    <div className="hfc-title">Mathematics</div>
                                    <div className="hfc-sub">Calculus & Algebra</div>
                                </div>
                                <div className="hfc-price">₹49</div>
                            </div>
                            <div className="hero-float-card card-2">
                                <div className="hfc-icon">⚗️</div>
                                <div className="hfc-content">
                                    <div className="hfc-title">Chemistry</div>
                                    <div className="hfc-sub">Organic Reactions</div>
                                </div>
                                <div className="hfc-price">₹59</div>
                            </div>
                            <div className="hero-float-card card-3">
                                <div className="hfc-icon">💻</div>
                                <div className="hfc-content">
                                    <div className="hfc-title">CS: DSA Guide</div>
                                    <div className="hfc-sub">With Code Examples</div>
                                </div>
                                <div className="hfc-price">₹79</div>
                            </div>
                            <div className="hero-earnings-badge">
                                <div className="earnings-icon">💰</div>
                                <div>
                                    <div className="earnings-val">₹3,240</div>
                                    <div className="earnings-label">Earned this month</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── STATS ── */}
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        {stats.map((s, i) => (
                            <div key={i} className="stat-card glass-card animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                                <div className="stat-icon">{s.icon}</div>
                                <div className="stat-value">{s.value}</div>
                                <div className="stat-label">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── BESTSELLER NOTES ── */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-tag">⭐ Bestsellers</div>
                        <h2 className="heading-lg">Top-Rated Notes This Week</h2>
                        <p className="section-sub">Hand-picked high-quality notes loved by thousands of students</p>
                    </div>
                    <div className="notes-grid">
                        {featuredNotes.map((note) => (
                            <NoteCard key={note.id} note={note} />
                        ))}
                    </div>
                    <div className="section-cta">
                        <Link to="/browse" className="btn btn-secondary btn-lg">View All Notes →</Link>
                    </div>
                </div>
            </section>

            {/* ── HOW IT WORKS ── */}
            <section className="how-section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-tag">✨ Simple Process</div>
                        <h2 className="heading-lg">How It Works</h2>
                        <p className="section-sub">Three easy steps to start learning or earning</p>
                    </div>
                    <div className="how-grid">
                        {howItWorks.map((item, i) => (
                            <div key={i} className="how-card glass-card">
                                <div className="how-step">{item.step}</div>
                                <div className="how-icon">{item.icon}</div>
                                <h3 className="how-title">{item.title}</h3>
                                <p className="how-desc">{item.desc}</p>
                                {i < howItWorks.length - 1 && <div className="how-connector" />}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FREE NOTES ── */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-tag">🆓 No Cost</div>
                        <h2 className="heading-lg">Start With Free Notes</h2>
                        <p className="section-sub">Premium-quality notes available completely free</p>
                    </div>
                    <div className="notes-grid notes-grid-3">
                        {freeNotes.map((note) => (
                            <NoteCard key={note.id} note={note} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIALS ── */}
            <section className="testimonials-section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-tag">❤️ Student Stories</div>
                        <h2 className="heading-lg">What Students Say</h2>
                    </div>
                    <div className="testimonials-grid">
                        {testimonials.map((t, i) => (
                            <div key={i} className="testimonial-card card">
                                <div className="testimonial-stars">{'⭐'.repeat(t.rating)}</div>
                                <p className="testimonial-text">"{t.text}"</p>
                                <div className="testimonial-author">
                                    <div className="test-avatar" style={{ background: `hsl(${i * 120 + 200}, 65%, 55%)` }}>
                                        {t.avatar}
                                    </div>
                                    <div>
                                        <div className="test-name">{t.name}</div>
                                        <div className="test-course">{t.course}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA BANNER ── */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-banner">
                        <div className="orb orb-purple cta-orb-1" />
                        <div className="orb orb-teal cta-orb-2" />
                        <div className="cta-content">
                            <h2 className="heading-lg cta-title">
                                Ready to Share Your Knowledge?
                            </h2>
                            <p className="cta-subtitle">
                                Join 10,000+ student creators who earn passive income from their notes.
                                Upload today — it's free!
                            </p>
                            <div className="cta-actions">
                                <Link to="/signup" className="btn btn-primary btn-lg">Start for Free 🎉</Link>
                                <Link to="/browse" className="btn btn-ghost btn-lg">Browse Notes</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
