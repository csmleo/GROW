import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import SignupPage from './pages/Signup'
import DashboardPage from './pages/Dashboard'
import ProfilePage from './pages/Profile'
import RequireAuth from './components/RequireAuth'
import GuestRoute from './components/GuestRoute'
import BrowsePage from './pages/Browse'
import UploadPage from './pages/Upload'

const NotFound = () => (
  <div style={{ textAlign: 'center', padding: '100px 24px' }}>
    <div style={{ fontSize: '5rem' }}>🔍</div>
    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2rem', marginTop: 24 }}>
      Page Not Found
    </h1>
    <p style={{ color: 'var(--text-muted)', marginTop: 12 }}>
      The page you're looking for doesn't exist.
    </p>
    <a href="/" className="btn btn-primary" style={{ marginTop: 28, display: 'inline-flex' }}>
      ← Back to Home
    </a>
  </div>
)

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
              <UploadPage />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <DashboardPage />
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
  )
}

export default App
