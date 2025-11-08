import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import './Home.css';

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-brand">
            <Logo size="small" />
          </div>
          <button onClick={handleLogout} className="btn-logout">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </nav>

      <main className="main-content">
        <div className="welcome-section">
          <div className="welcome-card">
            <div className="avatar">
              <User size={48} />
            </div>
            <h1>Welcome, {user?.name}! 👋</h1>
            <p className="subtitle">You're successfully logged in</p>
          </div>
        </div>

        <div className="info-section">
          <div className="info-card">
            <div className="info-header">
              <User size={24} />
              <h2>Profile Information</h2>
            </div>
            <div className="info-content">
              <div className="info-item">
                <span className="info-label">Name:</span>
                <span className="info-value">{user?.name}</span>
              </div>
              <div className="info-item">
                <Mail size={18} />
                <span className="info-label">Email:</span>
                <span className="info-value">{user?.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">User ID:</span>
                <span className="info-value">{user?.id}</span>
              </div>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <h3>Dashboard</h3>
              <p>View your analytics</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⚙️</div>
              <h3>Settings</h3>
              <p>Manage preferences</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📱</div>
              <h3>Activity</h3>
              <p>Recent actions</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🔔</div>
              <h3>Notifications</h3>
              <p>Stay updated</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
