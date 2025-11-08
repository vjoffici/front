import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Github, ExternalLink, Heart, Eye, LogOut, User, Briefcase } from 'lucide-react';
import { getProjects, createProject, likeProject } from '../api/project';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import './CommunityProjects.css';

const CommunityProjects = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    githubLink: '',
    technologies: '',
    category: 'web',
    status: 'in-progress'
  });

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'web', label: 'Web Development' },
    { value: 'mobile', label: 'Mobile Apps' },
    { value: 'ai-ml', label: 'AI/ML' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'iot', label: 'IoT' },
    { value: 'game', label: 'Game Development' },
    { value: 'other', label: 'Other' }
  ];

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, selectedCategory]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await getProjects(searchTerm, selectedCategory);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const techArray = newProject.technologies.split(',').map(t => t.trim());
      await createProject({ ...newProject, technologies: techArray });
      setShowCreateModal(false);
      setNewProject({
        title: '',
        description: '',
        githubLink: '',
        technologies: '',
        category: 'web',
        status: 'in-progress'
      });
      fetchProjects();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleLike = async (projectId) => {
    try {
      await likeProject(projectId);
      fetchProjects();
    } catch (error) {
      console.error('Error liking project:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="community-projects-page">
      <nav className="forums-navbar">
        <div className="forums-nav-content">
          <Logo size="medium" />
          <div className="nav-links">
            <button onClick={() => navigate('/')} className="nav-btn">Home</button>
            <button onClick={() => navigate('/forums')} className="nav-btn">Forums</button>
            <button onClick={() => navigate('/community-projects')} className="nav-btn active">Projects</button>
            <button onClick={() => navigate('/dashboard')} className="nav-btn">Dashboard</button>
          </div>
          <div className="nav-actions">
            <button onClick={() => navigate('/dashboard')} className="btn-icon" title="Edit Profile">
              <User size={18} />
            </button>
            <button onClick={handleLogout} className="btn-icon" title="Logout">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </nav>

      <div className="projects-container">
        <div className="projects-header">
          <div className="header-content">
            <h1>Community Projects</h1>
            <p>Discover and share amazing student projects</p>
          </div>
          <button className="btn-create-project" onClick={() => setShowCreateModal(true)}>
            <Plus size={20} />
            Add Project
          </button>
        </div>

        <div className="projects-controls">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="loading">Loading projects...</div>
        ) : (
          <div className="projects-grid">
            {projects.length === 0 ? (
              <div className="no-projects">
                <Briefcase size={48} />
                <h3>No projects found</h3>
                <p>Be the first to share your project!</p>
              </div>
            ) : (
              projects.map(project => (
                <div key={project._id} className="project-card">
                  <div className="project-header">
                    <h3>{project.title}</h3>
                    <span className={`status-badge ${project.status}`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="project-description">{project.description}</p>
                  
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="tech-tags">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  )}

                  <div className="project-footer">
                    <div className="project-meta">
                      <span className="owner">by {project.owner?.name}</span>
                      <div className="project-stats">
                        <span>
                          <Eye size={14} />
                          {project.views || 0}
                        </span>
                        <button 
                          onClick={() => handleLike(project._id)}
                          className={`like-btn ${project.likes?.includes(user?.id) ? 'liked' : ''}`}
                        >
                          <Heart size={14} />
                          {project.likes?.length || 0}
                        </button>
                      </div>
                    </div>
                    <div className="project-links">
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="link-btn">
                          <Github size={16} />
                          GitHub
                        </a>
                      )}
                      {project.ownerEmail && (
                        <a href={`mailto:${project.ownerEmail}`} className="link-btn">
                          <ExternalLink size={16} />
                          Contact
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Add New Project</h2>
            <form onSubmit={handleCreateProject}>
              <div className="form-group">
                <label>Project Title</label>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  placeholder="Enter project title"
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Describe your project"
                  rows="4"
                  required
                />
              </div>
              <div className="form-group">
                <label>GitHub Link</label>
                <input
                  type="url"
                  value={newProject.githubLink}
                  onChange={(e) => setNewProject({ ...newProject, githubLink: e.target.value })}
                  placeholder="https://github.com/username/repo"
                />
              </div>
              <div className="form-group">
                <label>Technologies (comma-separated)</label>
                <input
                  type="text"
                  value={newProject.technologies}
                  onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                  placeholder="React, Node.js, MongoDB"
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                  >
                    {categories.slice(1).map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={newProject.status}
                    onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                  >
                    <option value="planning">Planning</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowCreateModal(false)} className="btn-cancel">
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Add Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityProjects;
