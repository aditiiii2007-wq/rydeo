import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import BookingPage from './pages/BookingPage';
import HistoryPage from './pages/HistoryPage';
import WalletPage from './pages/WalletPage';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';
import SafetyPage from './pages/SafetyPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="h-screen w-screen flex items-center justify-center bg-slate-950 text-white font-black italic tracking-widest">LOADING RYDEO...</div>;
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
}

export default function App() {
  const { user } = useAuth();
  const location = useLocation();
  const isAuthPage = ['/login', '/register', '/'].includes(location.pathname);

  if (user && !isAuthPage) {
    return (
      <div className="flex h-screen w-full bg-bg text-white overflow-hidden font-sans selection:bg-primary/30">
        <Sidebar />
        <main className="flex-1 relative flex flex-col h-full overflow-y-auto">
          <Header />
          <div className="flex-1 p-6">
            <Routes>
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/book" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
              <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
              <Route path="/wallet" element={<ProtectedRoute><WalletPage /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/safety" element={<ProtectedRoute><SafetyPage /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
              {/* Fallback to dashboard if authenticated and trying to go to an invalid path */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Redirect to dashboard if trying to access landing/login while logged in */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
