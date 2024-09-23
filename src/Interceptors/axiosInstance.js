import axios from 'axios';

// Create an instance of axios
const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000/api',
    withCredentials: true, // Ensure cookies are included in requests
});

// Request interceptor to add the CSRF token to headers
axiosInstance.interceptors.request.use(config => {
    const csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrfToken='))
        ?.split('=')[1]; // Retrieve CSRF token from cookies

    console.log('CSRF Token being sent:', csrfToken); // Debugging: log the CSRF token

    // Add CSRF token if available
    if (csrfToken) {
        config.headers['X-CSRF-Token'] = csrfToken; // Ensure header matches server expectation
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
            console.error('Unauthorized access. Please log in again.');
            window.location.href = '/login'; // Redirect to login
        } else if (error.response.status === 403) {
            console.warn('Access denied. You do not have permission to perform this action.');
        } else {
            console.error('An unexpected error occurred:', error.response.data.message);
        }
    } else {
        console.error('Error with no response:', error);
    }
    return Promise.reject(error);
});

export default axiosInstance;
