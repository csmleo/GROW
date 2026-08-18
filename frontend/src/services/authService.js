import api from '../api/axiosConfig';

// Register a new user
export const registerUser = (data) => api.post('/auth/register', data);

// Login user
export const loginUser = (data) => api.post('/auth/login', data);

// Get current logged-in user profile (protected)
export const getProfile = () => api.get('/auth/me');
