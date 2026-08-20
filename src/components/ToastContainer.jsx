import { useToast } from '../context/ToastContext.jsx';

const icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };

const ToastContainer = () => {
    const { toasts, removeToast } = useToast();

    if (!toasts.length) return null;

    return (
        <div className="toast-container" aria-live="polite">
            {toasts.map((t) => (
                <div key={t.id} className={`toast toast-${t.type}`} role="alert">
                    <span className="toast-icon">{icons[t.type]}</span>
                    <span className="toast-message">{t.message}</span>
                    <button type="button" className="toast-close" onClick={() => removeToast(t.id)} aria-label="Dismiss">
                        ✕
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ToastContainer;
