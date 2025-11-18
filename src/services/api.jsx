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

// Franchise API functions
export const franchiseAPI = {
  getProfile: () => api.get('/franchises/profile'),
  updateProfile: (data) => api.put('/franchises/profile', data),
  getKycStatus: () => api.get('/kyc/status'),
  submitKyc: (formData) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return api.post('/kyc/submit', formData, config);
  },
  // Add the new function for DigiLocker initialization
  initDigiLocker: () => api.post('/kyc/digilocker/init'),
  getCreditPackages: () => api.get('/packages/franchise'),
  initiatePayment: (packageId) => api.post('/payments/initiate', { packageId }),
  getCreditReport: (data) => api.post('/credit/check', data),
  getCreditReports: () => api.get('/credit/reports'),
  getDashboardStats: () => api.get('/dashboard'),
  getFranchiseLeads: () => api.get('/leads/franchise'),
  updateLeadStatus: (leadId, data) => api.put(`/leads/${leadId}/status`, data),
  // Business form functions
  submitBusinessForm: (data) => api.post('/business/submit', data),
  verifyBusinessPayment: (data) => api.post('/business/verify-payment', data),
  getBusinessForms: () => api.get('/business/franchise'),
  // Transactions
  getTransactions: () => api.get('/dashboard/transactions'),
  // Referrals
  getReferrals: () => api.get('/dashboard/referrals'),
  createReferral: (data) => api.post('/dashboard/referrals', data),
  // Payouts
  getFranchisePayouts: () => api.get('/dashboard/payouts'),
};

// Blog API functions
export const blogAPI = {
  getAllBlogs: (params) => api.get('/blogs', { params }),
  getBlogBySlug: (slug) => api.get(`/blogs/${slug}`),
  getBlogCategories: () => api.get('/blogs/categories')
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
  createFranchiseUser: (data) => api.post('/admin/franchises', data),
  approveRegistration: (id, data) => api.put(`/admin/franchises/${id}/approve-registration`, data),
  rejectRegistration: (id, rejectionReason) => api.put(`/admin/franchises/${id}/reject-registration`, { rejectionReason }),
  deleteFranchise: (id) => api.delete(`/admin/franchises/${id}`),
  // Credit recharge functions
  getAllFranchisesWithCredits: () => api.get('/admin/franchises/credits'),
  rechargeFranchiseCredits: (data) => api.post('/admin/franchises/recharge', data),
  getCreditRechargeHistory: () => api.get('/admin/credits/history'),
  // Payout functions
  calculateFranchisePayouts: (data) => api.post('/admin/payouts/calculate', data),
  getFranchisePayouts: (franchiseId) => api.get(`/admin/payouts/franchise/${franchiseId}`),
  getAllPayouts: () => api.get('/admin/payouts'),
  updatePayout: (id, data) => api.put(`/admin/payouts/${id}`, data),
  // KYC management
  getPendingKycRequests: () => api.get('/kyc/pending'),
  getKycByFranchiseId: (franchiseId) => api.get(`/kyc/franchise/${franchiseId}`),
  approveKyc: (id) => api.put(`/kyc/approve/${id}`),
  rejectKyc: (id, rejectionReason) => api.put(`/kyc/reject/${id}`, { rejectionReason }),
  // Package management
  getAllPackages: () => api.get('/packages/all'),
  getPackageById: (id) => api.get(`/packages/${id}`),
  createPackage: (packageData) => api.post('/packages', packageData),
  updatePackage: (id, packageData) => api.put(`/packages/${id}`, packageData),
  deletePackage: (id) => api.delete(`/packages/${id}`),
  // Customer package management
  getAllCustomerPackages: () => api.get('/customer-packages/all'),
  getCustomerPackageById: (id) => api.get(`/customer-packages/${id}`),
  createCustomerPackage: (packageData) => api.post('/customer-packages', packageData),
  updateCustomerPackage: (id, packageData) => api.put(`/customer-packages/${id}`, packageData),
  deleteCustomerPackage: (id) => api.delete(`/customer-packages/${id}`),
  // Lead management
  getAllLeads: () => api.get('/admin/leads'),
  getLeadById: (id) => api.get(`/admin/leads/${id}`),
  createLead: (leadData) => api.post('/admin/leads', leadData),
  updateLead: (id, data) => api.put(`/admin/leads/${id}`, data),
  bulkUploadLeads: (formData) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return api.post('/admin/leads/bulk-upload', formData, config);
  },
  // Business forms
  getAllBusinessForms: () => api.get('/business/all'),
  // Surepass settings
  getSurepassApiKey: () => api.get('/credit/settings/api-key'),
  updateSurepassApiKey: (apiKey) => api.put('/credit/settings/api-key', { apiKey }),
  // Credit reports
  getAllCreditReports: () => api.get('/credit/reports/all'),
  // Referrals
  getAllReferrals: () => api.get('/admin/referrals'),
  getReferralSettings: () => api.get('/admin/referral-settings'),
  updateReferralSettings: (data) => api.put('/admin/referral-settings', data),
  // Blogs
  getAllBlogs: (params) => api.get('/blogs/admin', { params }),
  createBlog: (blogData) => api.post('/blogs/admin', blogData),
  updateBlog: (id, blogData) => api.put(`/blogs/admin/${id}`, blogData),
  deleteBlog: (id) => api.delete(`/blogs/admin/${id}`),
};

// Credit API functions
export const creditAPI = {
  checkCreditScorePublic: (data) => api.post('/credit/check-public', data),
  submitCreditRepairEnquiry: (data) => api.post('/credit/repair-enquiry', data),
};

// EMI API functions
export const emiAPI = {
  calculateEMI: (data) => api.post('/emi/calculate', data),
  generateEmiSchedule: (data) => api.post('/emi/schedule', data),
};

// IFSC API functions
export const ifscAPI = {
  getBankDetails: (ifscCode) => axios.get(`https://ifsc.razorpay.com/${ifscCode}`),
};

export default api;