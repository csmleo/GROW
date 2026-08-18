import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { getProfile } from '../services/authService';
import { normalizeUser, STORAGE_KEYS } from '../utils/authUtils';

const AuthContext = createContext(null);

const readStoredUser = () => {
    const raw = localStorage.getItem(STORAGE_KEYS.user);
    if (!raw) return null;
    try {
        return normalizeUser(JSON.parse(raw));
    } catch {
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEYS.token) || null);
    const [user, setUser] = useState(readStoredUser);
    const [loading, setLoading] = useState(true);

    const clearAuth = useCallback(() => {
        localStorage.removeItem(STORAGE_KEYS.token);
        localStorage.removeItem(STORAGE_KEYS.user);
        setToken(null);
        setUser(null);
    }, []);

    const persistAuth = useCallback((newToken, newUser) => {
        if (newToken) {
            localStorage.setItem(STORAGE_KEYS.token, newToken);
            setToken(newToken);
        }

        if (newUser) {
            const normalized = normalizeUser(newUser);
            localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(normalized));
            setUser(normalized);
        }
    }, []);

    const login = useCallback((payload) => {
        persistAuth(payload?.token, payload?.user);
    }, [persistAuth]);

    const logout = useCallback(() => {
        clearAuth();
    }, [clearAuth]);

    useEffect(() => {
        const bootstrap = async () => {
            const storedToken = localStorage.getItem(STORAGE_KEYS.token);
            if (!storedToken) {
                setLoading(false);
                return;
            }

            try {
                const { data } = await getProfile();
                if (data?.success && data?.user) {
                    persistAuth(storedToken, data.user);
                } else {
                    clearAuth();
                }
            } catch {
                clearAuth();
            } finally {
                setLoading(false);
            }
        };

        bootstrap();
    }, [clearAuth, persistAuth]);

    useEffect(() => {
        const handleForcedLogout = () => clearAuth();
        window.addEventListener('auth:logout', handleForcedLogout);
        return () => window.removeEventListener('auth:logout', handleForcedLogout);
    }, [clearAuth]);

    const value = {
        token,
        user,
        loading,
        isAuthenticated: !!token,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
