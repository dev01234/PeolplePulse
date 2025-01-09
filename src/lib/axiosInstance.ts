import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,  // Replace with your API base URL
  withCredentials: true,  // This ensures that cookies are sent along with requests
});

// Intercept requests to add the access token (if necessary) to the Authorization header
api.interceptors.request.use(
  (config) => {
    // You can also check for token in cookies if needed (if you're handling tokens manually)
    const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('accessToken='));

    if (token) {
      // If token exists in cookies, attach it to the Authorization header (optional)
      config.headers['Authorization'] = `Bearer ${token.split('=')[1]}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Intercept responses to handle token expiration (optional)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle token expiration, e.g., by refreshing the token
      console.error("Access token expired, handle token refresh here.");
    }

    return Promise.reject(error);
  }
);

export default api;
