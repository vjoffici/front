import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LandingHome from './pages/LandingHome';
import Projects from './pages/Projects';
import CommunityProjects from './pages/CommunityProjects';
import Forums from './pages/Forums';
import ForumDetail from './pages/ForumDetail';
import Login from './pages/Login';
import RegisterWithOTP from './pages/RegisterWithOTP';
import Dashboard from './pages/Home';
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  // Google Client ID from Google Cloud Console
  const GOOGLE_CLIENT_ID = "52161996230-2gqefaaivf2lld1lmlgoc6obmcqv3rkg.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes - only login and register */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterWithOTP />} />
            
            {/* Protected routes - require login */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <LandingHome />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/projects" 
              element={
                <ProtectedRoute>
                  <Projects />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/forums" 
              element={
                <ProtectedRoute>
                  <Forums />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/forums/:id" 
              element={
                <ProtectedRoute>
                  <ForumDetail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/community-projects" 
              element={
                <ProtectedRoute>
                  <CommunityProjects />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            {/* Redirect old /home to /dashboard */}
            <Route path="/home" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
