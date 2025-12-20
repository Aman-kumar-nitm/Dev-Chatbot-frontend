
import api from './axios';

export const authApi = {
  // Login
  login: (credentials) => api.post('/auth/login', credentials),
  
  // Register
  register: (userData) => api.post('/auth/register', userData),
  
  // Verify OTP
  verifyOtp: (otpData) => api.post('/auth/verify-otp', otpData),
  
  // Forgot password
  forgotPassword: (email) => api.post('/auth/forgetPassword', { email }),
  
  // Reset password
  resetPassword: (resetData) => api.post('/auth/resetPassword', resetData),
  
  // Get current user
  getMe: () => api.get('/auth/me'),
  
  // Logout
  logout: () => api.post('/auth/logout'),
};