import { useState, useMemo } from 'react';
import NoteCard from '../components/NoteCard';
import { dummyNotes, SUBJECTS } from '../data/dummyData';
import './Browse.css';

const PRICE_RANGES = [
    { label: 'Any Price', value: 'any' },
    { label: 'Free Only', value: 'free' },
    { label: 'Under ₹50', value: 'under50' },
    { label: '₹50 – ₹100', value: '50-100' },
    { label: 'Above ₹100', value: 'above100' },
];

const SORT_OPTIONS = [
    { label: 'Most Popular', value: 'downloads' },
    { label: 'Top Rated', value: 'rating' },
    { label: 'Newest First', value: 'newest' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
];

const BrowsePage = () => {
    const [search, setSearch] = useState('');
    const [subject, setSubject] = useState('All');
    const [priceRange, setPriceRange] = useState('any');
    const [minRating, setMinRating] = useState(0);
    const [sortBy, setSortBy] = useState('downloads');
    const [showFilters, setShowFilters] = useState(false);

    const filtered = useMemo(() => {
        let result = [...dummyNotes];

        // Search
        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(
                (n) =>
                    n.title.toLowerCase().includes(q) ||
                    n.subject.toLowerCase().includes(q) ||
                    n.author.toLowerCase().includes(q) ||
                    n.tags.some((t) => t.toLowerCase().includes(q))
            );
        }

        // Subject
        if (subject !== 'All') result = result.filter((n) => n.subject === subject);

        // Price
        if (priceRange === 'free') result = result.filter((n) => n.price === 0);
        else if (priceRange === 'under50') result = result.filter((n) => n.price > 0 && n.price < 50);
        else if (priceRange === '50-100') result = result.filter((n) => n.price >= 50 && n.price <= 100);
        else if (priceRange === 'above100') result = result.filter((n) => n.price > 100);

        // Rating
        if (minRating > 0) result = result.filter((n) => n.rating >= minRating);

        // Sort
        if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
        else if (sortBy === 'newest') result.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
        else if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
        else if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
        else result.sort((a, b) => b.downloads - a.downloads);

        return result;
    }, [search, subject, priceRange, minRating, sortBy]);

    const clearFilters = () => {
        setSearch('');
        setSubject('All');
        setPriceRange('any');
        setMinRating(0);
        setSortBy('downloads');
    };

    const hasActiveFilters = subject !== 'All' || priceRange !== 'any' || minRating > 0 || search.trim();

    return (
        <div className="page-wrapper">
            {/* Page Header */}
            <div className="browse-hero">
                <div className="orb orb-purple browse-orb" />
                <div className="container browse-hero-inner">
                    <h1 className="heading-lg browse-title">Browse Student Notes</h1>
                    <p className="browse-subtitle">Find the perfect notes for your subject from our community of student creators</p>

                    {/* Search Bar */}
                    <div className="browse-search-wrap">
                        <div className="browse-search-icon">🔍</div>
                        <input
                            id="browse-search"
                            type="text"
                            placeholder="Search by subject, topic, or author…"
                            className="form-input browse-search-input"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {search && (
                            <button className="search-clear" onClick={() => setSearch('')}>✕</button>
                        )}
                    </div>

                    {/* Subject Quick Filters */}
                    <div className="subject-quick-filters">
                        {['All', ...SUBJECTS].slice(0, 8).map((s) => (
                            <button
                                key={s}
                                id={`subject-filter-${s}`}
                                className={`subject-chip ${subject === s ? 'active' : ''}`}
                                onClick={() => setSubject(s)}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container browse-layout">
                {/* Sidebar Filters */}
                <aside className={`filter-sidebar ${showFilters ? 'open' : ''}`}>
                    <div className="filter-sidebar-header">
                        <h3 className="filter-title">Filters</h3>
                        {hasActiveFilters && (
                            <button className="clear-filters-btn" onClick={clearFilters}>Clear All</button>
                        )}
                    </div>

                    {/* Subject Filter */}
                    <div className="filter-group">
                        <h4 className="filter-group-title">Subject</h4>
                        <div className="filter-list">
                            {['All', ...SUBJECTS].map((s) => (
                                <label key={s} className="filter-radio">
                                    <input
                                        type="radio"
                                        name="subject"
                                        value={s}
                                        checked={subject === s}
                                        onChange={() => setSubject(s)}
                                        id={`radio-subject-${s}`}
                                    />
                                    <span className="radio-custom" />
                                    <span className="radio-label">{s}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className="filter-group">
                        <h4 className="filter-group-title">Price Range</h4>
                        <div className="filter-list">
                            {PRICE_RANGES.map((p) => (
                                <label key={p.value} className="filter-radio">
                                    <input
                                        type="radio"
                                        name="price"
                                        value={p.value}
                                        checked={priceRange === p.value}
                                        onChange={() => setPriceRange(p.value)}
                                        id={`radio-price-${p.value}`}
                                    />
                                    <span className="radio-custom" />
                                    <span className="radio-label">{p.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Minimum Rating */}
                    <div className="filter-group">
                        <h4 className="filter-group-title">Min. Rating</h4>
                        <div className="rating-filter">
                            {[0, 3, 3.5, 4, 4.5].map((r) => (
                                <button
                                    key={r}
                                    id={`rating-filter-${r}`}
                                    className={`rating-chip ${minRating === r ? 'active' : ''}`}
                                    onClick={() => setMinRating(r)}
                                >
                                    {r === 0 ? 'Any' : `${r}★+`}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Results */}
                <div className="browse-results">
                    {/* Results Bar */}
                    <div className="results-bar">
                        <div className="results-count">
                            <strong>{filtered.length}</strong> notes found
                            {search && <span> for "<em>{search}</em>"</span>}
                        </div>
                        <div className="results-controls">
                            <select
                                id="sort-select"
                                className="form-select sort-select"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                {SORT_OPTIONS.map((o) => (
                                    <option key={o.value} value={o.value}>{o.label}</option>
                                ))}
                            </select>
                            <button
                                className="mobile-filter-toggle btn btn-ghost btn-sm hide-desktop"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                🎛️ Filters {hasActiveFilters && <span className="filter-dot" />}
                            </button>
                        </div>
                    </div>

                    {/* Active Filters Tags */}
                    {hasActiveFilters && (
                        <div className="active-filters">
                            {subject !== 'All' && (
                                <span className="active-filter-tag">
                                    📖 {subject}
                                    <button onClick={() => setSubject('All')}>✕</button>
                                </span>
                            )}
                            {priceRange !== 'any' && (
                                <span className="active-filter-tag">
                                    💰 {PRICE_RANGES.find((p) => p.value === priceRange)?.label}
                                    <button onClick={() => setPriceRange('any')}>✕</button>
                                </span>
                            )}
                            {minRating > 0 && (
                                <span className="active-filter-tag">
                                    ⭐ {minRating}+
                                    <button onClick={() => setMinRating(0)}>✕</button>
                                </span>
                            )}
                        </div>
                    )}

                    {/* Notes Grid */}
                    {filtered.length > 0 ? (
                        <div className="browse-notes-grid">
                            {filtered.map((note) => (
                                <NoteCard key={note.id} note={note} />
                            ))}
                        </div>
                    ) : (
                        <div className="no-results">
                            <div className="no-results-icon">📭</div>
                            <h3 className="no-results-title">No notes found</h3>
                            <p className="no-results-sub">Try different search terms or clear your filters.</p>
                            <button className="btn btn-primary" onClick={clearFilters}>Clear Filters</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BrowsePage;
