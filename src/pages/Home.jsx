import { useMemo, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import CategoryFilters from '../components/CategoryFilters';
import TrendingNotes from '../components/TrendingNotes';
import { CATEGORIES } from '../data/dummyData';
import { getTrendingNotes } from '../utils/notesUtils';
import { getNotes } from '../services/noteService';
import './Home.css';

const features = [
    { icon: '🔍', title: 'Find the Right Notes', desc: 'Search student-made notes by subject, topic, or keyword.' },
    { icon: '⬇️', title: 'Buy or Download Free', desc: 'Grab quality notes at student-friendly prices or download free ones instantly.' },
    { icon: '💸', title: 'Upload & Earn', desc: 'Share your own notes and earn money every time another student downloads them.' },
];

const HomePage = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [realNotes, setRealNotes] = useState([]);
    const [notesLoading, setNotesLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const loadHomeNotes = async () => {
            setNotesLoading(true);
            try {
                const { data } = await getNotes();
                if (cancelled) return;
                if (data?.success && Array.isArray(data.notes)) {
                    setRealNotes(
                        data.notes.map((note) => ({
                            id: note.id || note._id,
                            _id: note._id || note.id,
                            title: note.title,
                            subject: note.subject,
                            category: note.category || note.subject,
                            author: note.author || note.uploader?.name || 'Unknown',
                            authorAvatar: (note.author || note.uploader?.name || '?')[0]?.toUpperCase() || '?',
                            price: note.price ?? 0,
                            rating: note.rating ?? 0,
                            reviews: note.reviews ?? 0,
                            pages: note.pages || 0,
                            downloads: note.downloads ?? 0,
                            preview: note.description || note.preview || '',
                            tags: Array.isArray(note.tags) ? note.tags : [],
                            isBestseller: false,
                            isFree: Boolean(note.isFree || note.price === 0),
                            uploadDate: note.uploadDate || note.createdAt,
                            fileType: note.fileType || 'PDF',
                            fileUrl: note.fileUrl,
                            originalFilename: note.originalFilename,
                            isReal: true,
                        }))
                    );
                } else {
                    setRealNotes([]);
                }
            } catch {
                if (!cancelled) setRealNotes([]);
            } finally {
                if (!cancelled) setNotesLoading(false);
            }
        };

        loadHomeNotes();
        return () => {
            cancelled = true;
        };
    }, []);

    const trending = useMemo(() => getTrendingNotes(realNotes, 4), [realNotes]);
    const totalNotesCount = realNotes.length;
    const totalDownloadsCount = realNotes.reduce((sum, n) => sum + (n.downloads || 0), 0);

    const stats = [
        { value: `${totalNotesCount}`, label: 'Notes Available', icon: '📚' },
        { value: `${totalDownloadsCount}`, label: 'Total Downloads', icon: '⬇️' },
        { value: '100%', label: 'Student Verified', icon: '🎓' },
        { value: 'Free / ₹', label: 'Student Pricing', icon: '💸' },
    ];

    const handleSearch = (value) => {
        setSearch(value);
        if (value.trim()) {
            navigate(`/browse?search=${encodeURIComponent(value)}`);
        }
    };

    return (
        <div className="page-wrapper">
            {/* Hero with animation */}
            <section className="home-hero">
                <div className="hero-particles" aria-hidden>
                    {[...Array(12)].map((_, i) => (
                        <span
                            key={i}
                            className="hero-particle"
                            style={{ left: `${8 + i * 8}%`, animationDelay: `${i * 0.6}s` }}
                        />
                    ))}
                </div>
                <div className="orb orb-purple home-orb-1" />
                <div className="orb orb-teal home-orb-2" />
                <div className="container home-hero-inner animate-fade-up hero-float">
                    <div className="hero-badge">🎓 Student Notes Marketplace</div>
                    <h1>
                        Learn Smarter,{' '}
                        <span className="text-gradient">Earn Together</span>
                        <br />with GROW
                    </h1>
                    <p>
                        Discover student-created notes, flashcards &amp; study guides.
                        Buy, share, and earn — all in one place built for students, by students.
                    </p>

                    <div className="hero-search-wrap">
                        <SearchBar
                            id="home-search"
                            value={search}
                            onChange={handleSearch}
                            placeholder="Search Programming, DBMS, AI notes…"
                        />
                    </div>

                    <CategoryFilters active={category} onChange={setCategory} limit={8} />

                    <div className="hero-actions">
                        <Link
                            to={category !== 'All' ? `/browse?category=${encodeURIComponent(category)}` : '/browse'}
                            className="btn btn-primary btn-lg"
                        >
                            🚀 Explore Notes
                        </Link>
                        <Link to="/signup" className="btn btn-ghost btn-lg">✨ Join for Free</Link>
                    </div>
                    <p className="hero-trust">
                        <strong>Share knowledge and study smarter with GROW</strong>
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="section">
                <div className="container">
                    <div className="stats-grid">
                        {stats.map((s, i) => (
                            <div key={i} className="stat-card glass-card">
                                <div className="stat-icon">{s.icon}</div>
                                <div className="stat-value">{s.value}</div>
                                <div className="stat-label">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trending Section */}
            <section className="section">
                <div className="container">
                    {notesLoading ? (
                        <div className="card" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
                            ⏳ Loading trending notes…
                        </div>
                    ) : trending.length > 0 ? (
                        <TrendingNotes notes={trending} />
                    ) : (
                        <div className="card" style={{ padding: '40px 24px', textAlign: 'center' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>📚</div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: 8 }}>No Trending Notes Yet</h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: 20 }}>
                                Be the first student creator to publish study materials on GROW!
                            </p>
                            <Link to="/upload" className="btn btn-primary btn-sm">
                                + Upload Notes
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Categories showcase */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-tag">📂 Browse by Category</div>
                        <h2>Popular Study Categories</h2>
                        <p>Programming, DBMS, AI, Cybersecurity &amp; more</p>
                    </div>
                    <div className="category-showcase">
                        {CATEGORIES.filter((c) => c.label !== 'All').slice(0, 6).map((cat) => (
                            <Link
                                key={cat.id}
                                to={`/browse?category=${encodeURIComponent(cat.label)}`}
                                className="category-showcase-card glass-card"
                            >
                                <span className="category-showcase-icon">{cat.icon}</span>
                                <span className="category-showcase-label">{cat.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="section how-section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-tag">✨ Simple Process</div>
                        <h2>How GROW Works</h2>
                        <p>Three easy steps to start learning or earning</p>
                    </div>
                    <div className="features-grid">
                        {features.map((f, i) => (
                            <div key={i} className="feature-card card">
                                <div className="feature-icon">{f.icon}</div>
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section">
                <div className="container">
                    <div className="cta-banner glass-card">
                        <div className="orb orb-purple" style={{ width: 300, height: 300, top: '-100px', right: '-60px' }} />
                        <h2>Ready to Share Your Knowledge?</h2>
                        <p>Join student creators who share knowledge and earn from their notes.</p>
                        <div className="hero-actions" style={{ marginTop: 28 }}>
                            <Link to="/signup" className="btn btn-primary btn-lg">Start for Free 🎉</Link>
                            <Link to="/browse" className="btn btn-ghost btn-lg">Browse Notes</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
