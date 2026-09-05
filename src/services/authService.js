import api from '../api/axiosConfig';

// Register a new user
export const registerUser = (data) => api.post('/auth/register', data);

// Login user
export const loginUser = (data) => api.post('/auth/login', data);

// Get current logged-in user profile (protected)
export const getProfile = () => api.get('/auth/me');

// Update current logged-in user profile (protected)
export const updateProfile = (data) => api.put('/users/profile', data);

// Delete current logged-in user account (protected)
export const deleteAccount = () => api.delete('/auth/account');


