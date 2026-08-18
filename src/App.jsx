import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import BrowsePage from './pages/Browse';
import Upload from './pages/Upload';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/Profile';
import RequireAuth from './components/RequireAuth';
import GuestRoute from './components/GuestRoute';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <GuestRoute>
              <SignupPage />
            </GuestRoute>
          }
        />
        <Route path="/browse" element={<BrowsePage />} />
        <Route
          path="/upload"
          element={
            <RequireAuth>
              <Upload />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

const NotFound = () => (
  <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '24px', textAlign: 'center', padding: '80px 24px' }}>
    <div style={{ fontSize: '6rem' }}>🔍</div>
    <h1 className="heading-lg">Page Not Found</h1>
    <p style={{ color: 'var(--text-muted)', maxWidth: '360px' }}>The page you're looking for doesn't exist. Head back home to find what you need.</p>
    <a href="/" className="btn btn-primary btn-lg">← Back to Home</a>
  </div>
);

export default App;
