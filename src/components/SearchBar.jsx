/** Reusable search input for notes */
const SearchBar = ({ value, onChange, placeholder = 'Search notes, subjects, authors…', id = 'notes-search' }) => (
    <div className="search-bar-wrap">
        <span className="search-bar-icon" aria-hidden>🔍</span>
        <input
            id={id}
            type="search"
            className="form-input search-bar-input"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
        {value && (
            <button type="button" className="search-bar-clear" onClick={() => onChange('')} aria-label="Clear search">
                ✕
            </button>
        )}
    </div>
);

export default SearchBar;
