import { createContext, useCallback, useContext, useState } from 'react';

const BookmarkContext = createContext(null);
const STORAGE_KEY = 'grow_bookmarks';

const readBookmarks = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
};

export const BookmarkProvider = ({ children }) => {
    const [bookmarks, setBookmarks] = useState(readBookmarks);

    const persist = useCallback((ids) => {
        setBookmarks(ids);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    }, []);

    const toggleBookmark = useCallback((noteId) => {
        setBookmarks((prev) => {
            const next = prev.includes(noteId)
                ? prev.filter((id) => id !== noteId)
                : [...prev, noteId];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
            return next;
        });
    }, []);

    const isBookmarked = useCallback((noteId) => bookmarks.includes(noteId), [bookmarks]);

    return (
        <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
            {children}
        </BookmarkContext.Provider>
    );
};

export const useBookmarks = () => {
    const ctx = useContext(BookmarkContext);
    if (!ctx) throw new Error('useBookmarks must be used within BookmarkProvider');
    return ctx;
};
