import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

export const getProjects = async (search = '', category = '', status = '') => {
  const params = {};
  if (search) params.search = search;
  if (category) params.category = category;
  if (status) params.status = status;
  
  const response = await axios.get(`${API_URL}/projects`, {
    headers: getAuthHeader(),
    params
  });
  return response.data;
};

export const createProject = async (projectData) => {
  const response = await axios.post(`${API_URL}/projects`, projectData, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const getProjectById = async (id) => {
  const response = await axios.get(`${API_URL}/projects/${id}`, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const updateProject = async (id, projectData) => {
  const response = await axios.put(`${API_URL}/projects/${id}`, projectData, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await axios.delete(`${API_URL}/projects/${id}`, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const likeProject = async (id) => {
  const response = await axios.post(`${API_URL}/projects/${id}/like`, {}, {
    headers: getAuthHeader()
  });
  return response.data;
};
