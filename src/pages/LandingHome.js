import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import './LandingHome.css';

const LandingHome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="landing-container">
      <nav className="landing-navbar">
        <div className="landing-nav-content">
          <div className="landing-brand">
            <Logo size="medium" />
          </div>
          <div className="landing-nav-links">
            <button onClick={() => navigate('/')} className="nav-link active">Home</button>
            <button onClick={() => navigate('/forums')} className="nav-link">Forums</button>
            <button onClick={() => navigate('/projects')} className="nav-link">Projects</button>
            {user ? (
              <button onClick={() => navigate('/dashboard')} className="btn-nav-primary">
                Dashboard
              </button>
            ) : (
              <>
                <button onClick={() => navigate('/login')} className="btn-nav-secondary">
                  Login
                </button>
                <button onClick={() => navigate('/register')} className="btn-nav-primary">
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="landing-main">
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome to <span className="gradient-text">College Community</span>
            </h1>
            <p className="hero-subtitle">
              Build amazing projects with our powerful platform. 
              Collaborate, create, and innovate with ease.
            </p>
            <div className="hero-buttons">
              <button onClick={() => navigate('/register')} className="btn-hero-primary">
                <UserPlus size={20} />
                Get Started Free
              </button>
              <button onClick={() => navigate('/projects')} className="btn-hero-secondary">
                <Briefcase size={20} />
                View Projects
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-card card-1">
              <div className="card-icon">🚀</div>
              <h3>Fast & Reliable</h3>
              <p>Lightning-fast performance</p>
            </div>
            <div className="floating-card card-2">
              <div className="card-icon">🔒</div>
              <h3>Secure</h3>
              <p>Enterprise-grade security</p>
            </div>
            <div className="floating-card card-3">
              <div className="card-icon">⚡</div>
              <h3>Powerful</h3>
              <p>Advanced features</p>
            </div>
          </div>
        </section>

        <section className="features-section">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <h3>Innovative Solutions</h3>
              <p>Cutting-edge technology to solve your problems efficiently</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Goal Oriented</h3>
              <p>Focused on delivering results that matter to you</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Collaborative</h3>
              <p>Work together seamlessly with your team</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Scalable</h3>
              <p>Grow your projects without limitations</p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of users already using our platform</p>
            <button onClick={() => navigate('/register')} className="btn-cta">
              Create Your Account
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingHome;
