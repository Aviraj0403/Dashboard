import axios from 'axios';

// Create an instance of axios
const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000/api',
    withCredentials: true, // Ensure cookies are included in requests
});

// Function to retrieve tokens from cookies
const getTokenFromCookies = (tokenName) => {
    const token = document.cookie
        .split('; ')
        .find(row => row.startsWith(`${tokenName}=`))
        ?.split('=')[1];
    return token || null;
};

// Request interceptor to add the access and CSRF tokens to headers
axiosInstance.interceptors.request.use(config => {
    const accessToken = getTokenFromCookies('accessToken');
    const csrfToken = getTokenFromCookies('csrfToken');

    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`; // Attach access token
    }
    
    if (csrfToken) {
        config.headers['X-CSRF-Token'] = csrfToken; // Attach CSRF token
    }

    return config;
}, error => {
    return Promise.reject(error);
});

// Response interceptor for handling errors globally
axiosInstance.interceptors.response.use(response => {
    return response;
}, async (error) => {
    if (error.response) {
        if (error.response.status === 401) {
            console.error('Unauthorized access. Attempting to refresh token...');

            // Try to refresh the token
            try {
                const refreshToken = getTokenFromCookies('refreshToken');
                const response = await axios.post('http://localhost:4000/api/auth/refresh', {}, {
                    headers: { 'Authorization': `Bearer ${refreshToken}` },
                    withCredentials: true,
                });

                // Save new access token from the response
                document.cookie = `accessToken=${response.data.accessToken}; Path=/; HttpOnly; Secure;`;
                return axiosInstance(error.config); // Retry the original request
            } catch (refreshError) {
                console.error('Failed to refresh token. Redirecting to login.');
                window.location.href = '/login'; // Redirect to login
            }
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
