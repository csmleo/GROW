import { useTheme } from '../context/ThemeContext.jsx';

const ThemeToggle = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Light mode' : 'Dark mode'}
        >
            <span className="theme-toggle-icon">{isDark ? '☀️' : '🌙'}</span>
        </button>
    );
};

export default ThemeToggle;
