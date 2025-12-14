import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import CreateQuiz from './pages/CreateQuiz';
import UserDashboard from './pages/UserDashboard';
import TakeQuiz from './pages/TakeQuiz';
import Result from './pages/Result';
import Leaderboard from './pages/Leaderboard';
import QuizHistory from './pages/QuizHistory';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="flex-center" style={{ height: '100vh' }}>Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/create-quiz" element={
                <ProtectedRoute role="admin">
                  <CreateQuiz />
                </ProtectedRoute>
              } />
              <Route path="/admin/edit-quiz/:id" element={
                <ProtectedRoute role="admin">
                  <CreateQuiz />
                </ProtectedRoute>
              } />

              {/* User Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute role="user">
                  <UserDashboard />
                </ProtectedRoute>
              } />
              <Route path="/quiz/:id" element={
                <ProtectedRoute role="user">
                  <TakeQuiz />
                </ProtectedRoute>
              } />
              <Route path="/result" element={
                <ProtectedRoute role="user">
                  <Result />
                </ProtectedRoute>
              } />
              <Route path="/history" element={
                <ProtectedRoute role="user">
                  <QuizHistory />
                </ProtectedRoute>
              } />

              {/* Leaderboard Route - accessible to all authenticated users */}
              <Route path="/quiz/:id/leaderboard" element={
                <ProtectedRoute>
                  <Leaderboard />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Toaster position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
