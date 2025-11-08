import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Code, Globe, Smartphone, Database } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import './Projects.css';

const Projects = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack online shopping platform with payment integration',
      icon: <Globe size={32} />,
      tech: ['React', 'Node.js', 'MongoDB'],
      color: '#6366f1'
    },
    {
      id: 2,
      title: 'Mobile App',
      description: 'Cross-platform mobile application for iOS and Android',
      icon: <Smartphone size={32} />,
      tech: ['React Native', 'Firebase'],
      color: '#8b5cf6'
    },
    {
      id: 3,
      title: 'API Service',
      description: 'RESTful API service with authentication and rate limiting',
      icon: <Code size={32} />,
      tech: ['Express', 'JWT', 'Redis'],
      color: '#ec4899'
    },
    {
      id: 4,
      title: 'Data Analytics',
      description: 'Real-time data processing and visualization dashboard',
      icon: <Database size={32} />,
      tech: ['Python', 'PostgreSQL', 'D3.js'],
      color: '#10b981'
    },
    {
      id: 5,
      title: 'Social Network',
      description: 'Social media platform with real-time messaging',
      icon: <Globe size={32} />,
      tech: ['React', 'Socket.io', 'AWS'],
      color: '#f59e0b'
    },
    {
      id: 6,
      title: 'AI Chatbot',
      description: 'Intelligent chatbot powered by machine learning',
      icon: <Code size={32} />,
      tech: ['Python', 'TensorFlow', 'NLP'],
      color: '#ef4444'
    }
  ];

  return (
    <div className="projects-container">
      <nav className="landing-navbar">
        <div className="landing-nav-content">
          <div className="landing-brand">
            <Logo size="medium" />
          </div>
          <div className="landing-nav-links">
            <button onClick={() => navigate('/')} className="nav-link">Home</button>
            <button onClick={() => navigate('/projects')} className="nav-link active">Projects</button>
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

      <main className="projects-main">
        <section className="projects-hero">
          <div className="projects-hero-content">
            <Briefcase size={48} className="projects-hero-icon" />
            <h1>Our Projects</h1>
            <p>Explore our portfolio of innovative solutions and successful implementations</p>
          </div>
        </section>

        <section className="projects-grid-section">
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className="project-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="project-icon" style={{ color: project.color }}>
                  {project.icon}
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <button className="btn-view-project" style={{ borderColor: project.color, color: project.color }}>
                  View Details
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="projects-cta">
          <h2>Have a Project in Mind?</h2>
          <p>Let's work together to bring your ideas to life</p>
          <button onClick={() => navigate('/register')} className="btn-projects-cta">
            Get Started
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;
