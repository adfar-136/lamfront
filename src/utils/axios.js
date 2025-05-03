import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: 'https://lamback.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Special handling for /add-doc route
    if (config.url.includes('/add-doc')) {
      const userEmail = localStorage.getItem('userEmail');
      if (userEmail !== 'lamicons@lami.com') {
        return Promise.reject(new Error('Unauthorized access to documentation'));
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Handle specific error statuses
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 403:
          // Forbidden - redirect to unauthorized page
          window.location.href = '/unauthorized';
          break;
        case 404:
          // Not found - handle appropriately
          console.error('Resource not found');
          break;
        case 500:
          // Server error - show error message
          console.error('Server error occurred');
          break;
        default:
          console.error('An error occurred:', error.response.data);
      }
    } else if (error.request) {
      // Network error
      console.error('Network error - no response received');
    } else {
      // Other errors
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 