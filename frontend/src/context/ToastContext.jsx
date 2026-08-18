import { createContext, useCallback, useContext, useState } from 'react';

const ToastContext = createContext(null);
let toastId = 0;

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const showToast = useCallback((message, type = 'success', duration = 3500) => {
        const id = ++toastId;
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => removeToast(id), duration);
    }, [removeToast]);

    const toast = {
        success: (msg) => showToast(msg, 'success'),
        error: (msg) => showToast(msg, 'error', 4500),
        warning: (msg) => showToast(msg, 'warning'),
        info: (msg) => showToast(msg, 'info'),
    };

    return (
        <ToastContext.Provider value={{ toast, toasts, removeToast }}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToast must be used within ToastProvider');
    return ctx;
};
