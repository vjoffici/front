import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Users, MessageSquare, TrendingUp, LogOut, User } from 'lucide-react';
import { getForums, createForum } from '../api/forum';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import './Forums.css';

const Forums = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newForum, setNewForum] = useState({
    name: '',
    description: '',
    category: 'general',
    isPublic: true
  });

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'general', label: 'General' },
    { value: 'academic', label: 'Academic' },
    { value: 'projects', label: 'Projects' },
    { value: 'events', label: 'Events' },
    { value: 'clubs', label: 'Clubs' },
    { value: 'other', label: 'Other' }
  ];

  useEffect(() => {
    fetchForums();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, selectedCategory]);

  const fetchForums = async () => {
    try {
      setLoading(true);
      const response = await getForums(searchTerm, selectedCategory);
      setForums(response.data);
    } catch (error) {
      console.error('Error fetching forums:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateForum = async (e) => {
    e.preventDefault();
    try {
      await createForum(newForum);
      setShowCreateModal(false);
      setNewForum({ name: '', description: '', category: 'general', isPublic: true });
      fetchForums();
    } catch (error) {
      console.error('Error creating forum:', error);
    }
  };

  return (
    <div className="forums-page">
      <nav className="forums-navbar">
        <div className="forums-nav-content">
          <Logo size="medium" />
          <div className="nav-links">
            <button onClick={() => navigate('/')} className="nav-btn">Home</button>
            <button onClick={() => navigate('/forums')} className="nav-btn active">Forums</button>
            <button onClick={() => navigate('/community-projects')} className="nav-btn">Projects</button>
            <button onClick={() => navigate('/dashboard')} className="nav-btn">Dashboard</button>
          </div>
          <div className="nav-actions">
            <button onClick={() => navigate('/dashboard')} className="btn-icon" title="Edit Profile">
              <User size={18} />
            </button>
            <button onClick={() => { logout(); navigate('/login'); }} className="btn-icon" title="Logout">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </nav>

      <div className="forums-container">
        <div className="forums-header">
          <div className="header-content">
            <h1>College Forums</h1>
            <p>Join discussions, share ideas, and connect with your community</p>
          </div>
          <button className="btn-create-forum" onClick={() => setShowCreateModal(true)}>
            <Plus size={20} />
            Create Forum
          </button>
        </div>

        <div className="forums-controls">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search forums..."
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
          <div className="loading">Loading forums...</div>
        ) : (
          <div className="forums-grid">
            {forums.length === 0 ? (
              <div className="no-forums">
                <MessageSquare size={48} />
                <h3>No forums found</h3>
                <p>Be the first to create a forum!</p>
              </div>
            ) : (
              forums.map(forum => (
                <div
                  key={forum._id}
                  className="forum-card"
                  onClick={() => navigate(`/forums/${forum._id}`)}
                >
                  <div className="forum-header">
                    <h3>{forum.name}</h3>
                    <span className={`category-badge ${forum.category}`}>
                      {forum.category}
                    </span>
                  </div>
                  <p className="forum-description">{forum.description}</p>
                  <div className="forum-stats">
                    <div className="stat">
                      <Users size={16} />
                      <span>{forum.members?.length || 0} members</span>
                    </div>
                    <div className="stat">
                      <TrendingUp size={16} />
                      <span>Active</span>
                    </div>
                  </div>
                  <div className="forum-footer">
                    <span className="creator">by {forum.creator?.name}</span>
                    <span className="date">
                      {new Date(forum.createdAt).toLocaleDateString()}
                    </span>
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
            <h2>Create New Forum</h2>
            <form onSubmit={handleCreateForum}>
              <div className="form-group">
                <label>Forum Name</label>
                <input
                  type="text"
                  value={newForum.name}
                  onChange={(e) => setNewForum({ ...newForum, name: e.target.value })}
                  placeholder="Enter forum name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newForum.description}
                  onChange={(e) => setNewForum({ ...newForum, description: e.target.value })}
                  placeholder="Describe your forum"
                  rows="4"
                  required
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={newForum.category}
                  onChange={(e) => setNewForum({ ...newForum, category: e.target.value })}
                >
                  {categories.slice(1).map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={newForum.isPublic}
                    onChange={(e) => setNewForum({ ...newForum, isPublic: e.target.checked })}
                  />
                  Public Forum
                </label>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowCreateModal(false)} className="btn-cancel">
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Create Forum
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forums;
