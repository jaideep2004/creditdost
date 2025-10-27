import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - remove token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
};

// Admin API functions
export const adminAPI = {
  getDashboardStats: () => api.get('/admin/dashboard'),
  getRecentActivities: () => api.get('/admin/dashboard/activities'),
  // Franchise management
  getAllFranchises: () => api.get('/franchises'),
  getFranchiseById: (id) => api.get(`/franchises/${id}`),
  updateFranchise: (id, data) => api.put(`/franchises/${id}`, data),
  activateFranchise: (id) => api.put(`/franchises/${id}/activate`),
  deactivateFranchise: (id) => api.put(`/franchises/${id}/deactivate`),
  // KYC management
  getPendingKycRequests: () => api.get('/kyc/pending'),
  getKycByFranchiseId: (franchiseId) => api.get(`/kyc/franchise/${franchiseId}`),
  approveKyc: (id) => api.put(`/kyc/approve/${id}`),
  rejectKyc: (id, rejectionReason) => api.put(`/kyc/reject/${id}`, { rejectionReason }),
};

export default api;