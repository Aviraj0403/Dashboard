import axios from 'axios';
// Create an instance of axios
const axiosInstance = axios.create({
    // baseURL: 'http://localhost:4000/api', 
    // Use environment variable for base URL
    baseURL: 'https://backend-obet.onrender.com/api' || 'http://localhost:4000' ,
    withCredentials: true, // Ensure cookies are included in requests
});

// Function to retrieve CSRF token from cookies
const getCsrfTokenFromCookies = () => {
    const cookieString = document.cookie.split('; ').find(row => row.startsWith('csrfToken='));
    return cookieString ? cookieString.split('=')[1] : null;
};

// Function to retrieve access token from cookies
const getAccessTokenFromCookies = () => {
    const cookieString = document.cookie.split('; ').find(row => row.startsWith('accessToken='));
    return cookieString ? cookieString.split('=')[1] : null;
};

// Function to check if the user is logged in (e.g., check if access token exists)
const isUserLoggedIn = () => {
    return !!getAccessTokenFromCookies(); // Returns true if access token exists
};

// Request interceptor to add the CSRF token and Authorization header
axiosInstance.interceptors.request.use(config => {
    const csrfToken = getCsrfTokenFromCookies();
    const accessToken = getAccessTokenFromCookies();
    
    if (csrfToken) {
        config.headers['X-CSRF-Token'] = csrfToken; // Attach CSRF token
        console.log('CSRF token added to request headers:', csrfToken); // Debugging
    } else if (isUserLoggedIn()) { // Only warn if the user is logged in
        console.warn('No CSRF token found in cookies. Make sure you are logged in and the CSRF token is set.');
    }

    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`; // Attach access token
        console.log('Access token added to request headers:', accessToken); // Debugging
    } else if (isUserLoggedIn()) { // Only warn if the user is logged in
        console.warn('No access token found in cookies. Please log in to obtain an access token.');
    }

    return config;
}, error => {
    console.error('Error in request interceptor:', error); // Debugging
    return Promise.reject(error);
});

// Response interceptor for handling errors globally
axiosInstance.interceptors.response.use(response => {
    console.log('Response received:', response); // Debugging
    return response;
}, async (error) => {
    if (error.response) {
        const { status, data } = error.response;
        console.error('Response error:', status, data); // Debugging

        if (status === 401 && !error.config._retry) {
            console.error('Unauthorized access. Attempting to refresh token...');
            error.config._retry = true;

            try {
                const refreshToken = getAccessTokenFromCookies(); // Adjust this if you're storing refresh token differently
                const response = await axios.post(`${axiosInstance.defaults.baseURL}/auth/refresh-token`, {
                    refreshToken,
                }, {
                    withCredentials: true,
                });

                const newAccessToken = response.data.accessToken;
                document.cookie = `accessToken=${newAccessToken}; path=/`; // Set the access token in a cookie
                console.log('Access token refreshed successfully:', newAccessToken); // Debugging

                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                return axiosInstance(error.config);
            } catch (refreshError) {
                console.error('Failed to refresh token. Redirecting to login.', refreshError); // Debugging
                window.location.href = '/login';
            }
        } else if (status === 403) {
            console.warn('Access denied. You do not have permission to perform this action.'); // Debugging
        } else {
            console.error('An unexpected error occurred:', data.message || 'No error message available.'); // Debugging
        }
    } else {
        console.error('Error with no response:', error); // Debugging
    }
    return Promise.reject(error);
});

export default axiosInstance;
