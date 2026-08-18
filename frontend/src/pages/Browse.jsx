import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import NoteCard from '../components/NoteCard';
import SearchBar from '../components/SearchBar';
import CategoryFilters from '../components/CategoryFilters';
import EmptyState from '../components/EmptyState';
import NotePreviewModal from '../components/NotePreviewModal';
import { dummyNotes, SUBJECTS } from '../data/dummyData';
import { filterNotes } from '../utils/notesUtils';
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
    const [searchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [category, setCategory] = useState(searchParams.get('category') || 'All');
    const [subject, setSubject] = useState('All');
    const [priceRange, setPriceRange] = useState('any');
    const [minRating, setMinRating] = useState(0);
    const [sortBy, setSortBy] = useState('downloads');
    const [showFilters, setShowFilters] = useState(false);
    const [previewNote, setPreviewNote] = useState(null);

    useEffect(() => {
        const q = searchParams.get('search');
        const c = searchParams.get('category');
        if (q) setSearch(q);
        if (c) setCategory(c);
    }, [searchParams]);

    const filtered = useMemo(() => {
        let result = filterNotes(dummyNotes, { search, category, subject });

        if (priceRange === 'free') result = result.filter((n) => n.price === 0);
        else if (priceRange === 'under50') result = result.filter((n) => n.price > 0 && n.price < 50);
        else if (priceRange === '50-100') result = result.filter((n) => n.price >= 50 && n.price <= 100);
        else if (priceRange === 'above100') result = result.filter((n) => n.price > 100);

        if (minRating > 0) result = result.filter((n) => n.rating >= minRating);

        if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
        else if (sortBy === 'newest') result.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
        else if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
        else if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
        else result.sort((a, b) => b.downloads - a.downloads);

        return result;
    }, [search, category, subject, priceRange, minRating, sortBy]);

    const clearFilters = () => {
        setSearch('');
        setCategory('All');
        setSubject('All');
        setPriceRange('any');
        setMinRating(0);
        setSortBy('downloads');
    };

    const hasActiveFilters = category !== 'All' || subject !== 'All' || priceRange !== 'any' || minRating > 0 || search.trim();

    return (
        <div className="page-wrapper">
            <div className="browse-hero">
                <div className="orb orb-purple browse-orb" />
                <div className="container browse-hero-inner">
                    <h1 className="heading-lg browse-title">Browse Student Notes</h1>
                    <p className="browse-subtitle">Find the perfect notes — filter by category, subject, or search</p>

                    <SearchBar
                        id="browse-search"
                        value={search}
                        onChange={setSearch}
                        placeholder="Search by title, author, tags…"
                    />

                    <CategoryFilters active={category} onChange={setCategory} />
                </div>
            </div>

            <div className="container browse-layout">
                <aside className={`filter-sidebar ${showFilters ? 'open' : ''}`}>
                    <div className="filter-sidebar-header">
                        <h3 className="filter-title">Filters</h3>
                        {hasActiveFilters && (
                            <button type="button" className="clear-filters-btn" onClick={clearFilters}>Clear All</button>
                        )}
                    </div>

                    <div className="filter-group">
                        <h4 className="filter-group-title">Subject</h4>
                        <div className="filter-list">
                            {['All', ...SUBJECTS].map((s) => (
                                <label key={s} className="filter-radio">
                                    <input
                                        type="radio"
                                        name="subject"
                                        checked={subject === s}
                                        onChange={() => setSubject(s)}
                                    />
                                    <span className="radio-custom" />
                                    <span className="radio-label">{s}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="filter-group">
                        <h4 className="filter-group-title">Price Range</h4>
                        <div className="filter-list">
                            {PRICE_RANGES.map((p) => (
                                <label key={p.value} className="filter-radio">
                                    <input
                                        type="radio"
                                        name="price"
                                        checked={priceRange === p.value}
                                        onChange={() => setPriceRange(p.value)}
                                    />
                                    <span className="radio-custom" />
                                    <span className="radio-label">{p.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="filter-group">
                        <h4 className="filter-group-title">Min. Rating</h4>
                        <div className="rating-filter">
                            {[0, 3, 3.5, 4, 4.5].map((r) => (
                                <button
                                    key={r}
                                    type="button"
                                    className={`rating-chip ${minRating === r ? 'active' : ''}`}
                                    onClick={() => setMinRating(r)}
                                >
                                    {r === 0 ? 'Any' : `${r}★+`}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                <div className="browse-results">
                    <div className="results-bar">
                        <div className="results-count">
                            <strong>{filtered.length}</strong> notes found
                            {search && <span> for "<em>{search}</em>"</span>}
                        </div>
                        <div className="results-controls">
                            <select
                                className="form-select sort-select"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                {SORT_OPTIONS.map((o) => (
                                    <option key={o.value} value={o.value}>{o.label}</option>
                                ))}
                            </select>
                            <button
                                type="button"
                                className="mobile-filter-toggle btn btn-ghost btn-sm hide-desktop"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                🎛️ Filters
                            </button>
                        </div>
                    </div>

                    {filtered.length > 0 ? (
                        <div className="browse-notes-grid">
                            {filtered.map((note) => (
                                <NoteCard key={note.id} note={note} onPreview={setPreviewNote} />
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            icon="📭"
                            title="No notes found"
                            message="Try different search terms or clear your filters."
                            actionLabel="Clear Filters"
                            onAction={clearFilters}
                        />
                    )}
                </div>
            </div>

            <NotePreviewModal note={previewNote} onClose={() => setPreviewNote(null)} />
        </div>
    );
};

export default BrowsePage;
