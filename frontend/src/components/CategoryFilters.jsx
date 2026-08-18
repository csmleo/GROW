import { CATEGORIES } from '../data/dummyData';

/** Category chip filters — Programming, DBMS, AI, etc. */
const CategoryFilters = ({ active, onChange, limit }) => {
    const list = limit ? CATEGORIES.slice(0, limit) : CATEGORIES;

    return (
        <div className="category-filters">
            {list.map((cat) => (
                <button
                    key={cat.id}
                    type="button"
                    className={`category-chip ${active === cat.label ? 'active' : ''}`}
                    onClick={() => onChange(cat.label)}
                >
                    <span className="category-chip-icon">{cat.icon}</span>
                    <span>{cat.label}</span>
                </button>
            ))}
        </div>
    );
};

export default CategoryFilters;
