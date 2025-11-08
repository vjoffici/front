import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Heart, MessageCircle, Users, Plus, LogOut, User } from 'lucide-react';
import { getForumById, getForumPosts, createPost, likePost, addComment, joinForum } from '../api/forum';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import './ForumDetail.css';

const ForumDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [forum, setForum] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [commentText, setCommentText] = useState({});
  const [showComments, setShowComments] = useState({});

  useEffect(() => {
    fetchForumData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchForumData = async () => {
    try {
      setLoading(true);
      const [forumRes, postsRes] = await Promise.all([
        getForumById(id),
        getForumPosts(id)
      ]);
      setForum(forumRes.data);
      setPosts(postsRes.data);
    } catch (error) {
      console.error('Error fetching forum data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinForum = async () => {
    try {
      await joinForum(id);
      fetchForumData();
    } catch (error) {
      console.error('Error joining forum:', error);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await createPost(id, newPost);
      setNewPost({ title: '', content: '' });
      setShowCreatePost(false);
      fetchForumData();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleLikePost = async (postId) => {
    try {
      await likePost(postId);
      fetchForumData();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleAddComment = async (postId) => {
    try {
      const content = commentText[postId];
      if (!content?.trim()) return;
      
      await addComment(postId, content);
      setCommentText({ ...commentText, [postId]: '' });
      fetchForumData();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const toggleComments = (postId) => {
    setShowComments({ ...showComments, [postId]: !showComments[postId] });
  };

  const isMember = forum?.members?.some(member => member._id === user?.id || member === user?.id);

  if (loading) {
    return <div className="loading-page">Loading forum...</div>;
  }

  if (!forum) {
    return <div className="error-page">Forum not found</div>;
  }

  return (
    <div className="forum-detail-page">
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

      <div className="forum-detail-container">
        <button className="btn-back" onClick={() => navigate('/forums')}>
          <ArrowLeft size={20} />
          Back to Forums
        </button>

        <div className="forum-info-card">
          <div className="forum-info-header">
            <div>
              <h1>{forum.name}</h1>
              <p>{forum.description}</p>
            </div>
            <div className="forum-actions">
              {!isMember && (
                <button className="btn-join" onClick={handleJoinForum}>
                  <Users size={20} />
                  Join Forum
                </button>
              )}
              <button className="btn-new-post" onClick={() => setShowCreatePost(true)}>
                <Plus size={20} />
                New Post
              </button>
            </div>
          </div>
          <div className="forum-meta">
            <span className={`category-badge ${forum.category}`}>{forum.category}</span>
            <span className="members-count">
              <Users size={16} />
              {forum.members?.length || 0} members
            </span>
            <span className="creator">Created by {forum.creator?.name}</span>
          </div>
        </div>

        <div className="posts-section">
          <h2>Discussions ({posts.length})</h2>
          
          {posts.length === 0 ? (
            <div className="no-posts">
              <MessageCircle size={48} />
              <h3>No posts yet</h3>
              <p>Be the first to start a discussion!</p>
            </div>
          ) : (
            <div className="posts-list">
              {posts.map(post => (
                <div key={post._id} className="post-card">
                  <div className="post-header">
                    <div className="post-author">
                      <div className="author-avatar">
                        {post.author?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3>{post.author?.name}</h3>
                        <span className="post-date">
                          {new Date(post.createdAt).toLocaleDateString()} at{' '}
                          {new Date(post.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <h2 className="post-title">{post.title}</h2>
                  <p className="post-content">{post.content}</p>

                  <div className="post-actions">
                    <button 
                      className={`action-btn ${post.likes?.includes(user?.id) ? 'liked' : ''}`}
                      onClick={() => handleLikePost(post._id)}
                    >
                      <Heart size={18} />
                      <span>{post.likes?.length || 0}</span>
                    </button>
                    <button 
                      className="action-btn"
                      onClick={() => toggleComments(post._id)}
                    >
                      <MessageCircle size={18} />
                      <span>{post.comments?.length || 0}</span>
                    </button>
                  </div>

                  {showComments[post._id] && (
                    <div className="comments-section">
                      <div className="comments-list">
                        {post.comments?.map((comment, idx) => (
                          <div key={idx} className="comment">
                            <div className="comment-avatar">
                              {comment.author?.name?.charAt(0).toUpperCase()}
                            </div>
                            <div className="comment-content">
                              <strong>{comment.author?.name}</strong>
                              <p>{comment.content}</p>
                              <span className="comment-date">
                                {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="comment-input">
                        <input
                          type="text"
                          placeholder="Write a comment..."
                          value={commentText[post._id] || ''}
                          onChange={(e) => setCommentText({ ...commentText, [post._id]: e.target.value })}
                          onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post._id)}
                        />
                        <button onClick={() => handleAddComment(post._id)}>
                          <Send size={18} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showCreatePost && (
        <div className="modal-overlay" onClick={() => setShowCreatePost(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Create New Post</h2>
            <form onSubmit={handleCreatePost}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="Enter post title"
                  required
                />
              </div>
              <div className="form-group">
                <label>Content</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="What's on your mind?"
                  rows="6"
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowCreatePost(false)} className="btn-cancel">
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForumDetail;
