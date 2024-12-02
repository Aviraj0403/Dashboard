import axios from 'axios';

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' 
    ? 'https://backend-obet.onrender.com/api' 
    : 'http://localhost:4000/api',
  withCredentials: true, // Ensure cookies are included in requests
  headers: { 'Content-Type': 'application/json' },
});

// Helper function to retrieve token from cookies with improved handling
const getTokenFromCookies = (tokenName) => {
  const cookieString = document.cookie.split('; ').find(row => row.startsWith(`${tokenName}=`));
  if (cookieString) {
    const token = cookieString.split('=')[1];
    console.log(`Retrieved ${tokenName}:`, token); // Log the token value for debugging
    return token;
  } else {
    console.log(`No ${tokenName} found in cookies.`); // Log if token is missing
    return null;
  }
};

// Request interceptor to add the CSRF token and Authorization header
axiosInstance.interceptors.request.use(config => {
  const csrfToken = getTokenFromCookies('csrfToken'); // Retrieve CSRF token from cookies
  const accessToken = getTokenFromCookies('accessToken'); // Retrieve Access token from cookies
  
  // Add CSRF token if it exists
  if (csrfToken) {
    config.headers['X-CSRF-Token'] = csrfToken;
    console.log('CSRF Token added to headers:', csrfToken); // Log CSRF token
  } else {
    console.log('No CSRF Token found'); // Log if CSRF token is missing
  }
  
  // Add Access Token if it exists
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
    console.log('Authorization Header added:', `Bearer ${accessToken}`); // Log Access Token
  } else {
    console.log('No Access Token found'); // Log if Access Token is missing
  }

  return config;
}, error => {
  console.error('Request Interceptor Error:', error);
  return Promise.reject(error);
});

// Response interceptor to handle token refresh on 401 Unauthorized
axiosInstance.interceptors.response.use(response => {
  return response;
}, async (error) => {
  // If the status is 401 (Unauthorized) and the request hasn't been retried yet
  if (error.response && error.response.status === 401 && !error.config._retry) {
    error.config._retry = true;
    try {
      // Attempt to refresh the access token
      const refreshedData = await refreshAccessToken();
      if (refreshedData) {
        // Retry the original request with the new access token
        return axiosInstance(error.config);
      }
    } catch (refreshError) {
      // If token refresh fails, redirect to login
      console.error('Token refresh failed, redirecting to login:', refreshError);
      window.location.href = '/login'; // Redirect to login on token refresh failure
    }
  }
  return Promise.reject(error);
});

// Function to refresh the Access Token
const refreshAccessToken = async () => {
  try {
    const refreshToken = getTokenFromCookies('refreshToken'); // Get the refresh token from cookies
    if (!refreshToken) {
      console.error('No refresh token available in cookies');
      return null;
    }

    console.log('Attempting to refresh access token with refresh token:', refreshToken);

    // Make a request to the backend to refresh the access token
    const response = await axiosInstance.post('/auth/refresh-token', { refreshToken });

    // If successful, update the access token in the cookies
    document.cookie = `accessToken=${response.data.accessToken}; path=/; secure; SameSite=Strict;`;
    console.log('Access token refreshed successfully:', response.data.accessToken);

    return response.data;
  } catch (error) {
    console.error('Failed to refresh access token:', error.message);
    return null;
  }
};

export default axiosInstance;
