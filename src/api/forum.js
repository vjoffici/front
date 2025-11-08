import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

export const getForums = async (search = '', category = '') => {
  const params = {};
  if (search) params.search = search;
  if (category) params.category = category;
  
  const response = await axios.get(`${API_URL}/forums`, {
    headers: getAuthHeader(),
    params
  });
  return response.data;
};

export const createForum = async (forumData) => {
  const response = await axios.post(`${API_URL}/forums`, forumData, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const getForumById = async (id) => {
  const response = await axios.get(`${API_URL}/forums/${id}`, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const joinForum = async (id) => {
  const response = await axios.post(`${API_URL}/forums/${id}/join`, {}, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const getForumPosts = async (forumId) => {
  const response = await axios.get(`${API_URL}/forums/${forumId}/posts`, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const createPost = async (forumId, postData) => {
  const response = await axios.post(`${API_URL}/forums/${forumId}/posts`, postData, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const likePost = async (postId) => {
  const response = await axios.post(`${API_URL}/forums/posts/${postId}/like`, {}, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const addComment = async (postId, content) => {
  const response = await axios.post(`${API_URL}/forums/posts/${postId}/comment`, 
    { content }, 
    { headers: getAuthHeader() }
  );
  return response.data;
};
