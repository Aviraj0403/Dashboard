import axios from 'axios';

// Create an instance of axios
const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000/api/auth',
    withCredentials: true, // Ensure cookies are included in requests
});

// Request interceptor to add the token to headers
axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    console.log('Token being sent:', token); // Debugging: log the token
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    } else {
        console.warn('No token found in localStorage.'); // Log if no token
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Response interceptor for handling errors globally
axiosInstance.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response) {
        if (error.response.status === 401) {
            alert('Unauthorized access. Please log in again.');
            localStorage.removeItem('token'); // Clear the token on unauthorized access
            window.location.href = '/login'; // Redirect to login
        } else if (error.response.status === 403) {
            alert('Access denied. You do not have permission to perform this action.');
        }
    }
    return Promise.reject(error);
});

export default axiosInstance;
