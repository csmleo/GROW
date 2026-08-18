import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const GuestRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="auth-loading" aria-live="polite" style={{ textAlign: 'center', padding: '48px' }}>
                Loading…
            </div>
        );
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default GuestRoute;
