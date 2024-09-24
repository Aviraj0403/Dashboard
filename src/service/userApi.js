import axiosInstance from '../Interceptors/axiosInstance.js';

// Cache to store responses and their timestamps
const cache = new Map();
const CACHE_EXPIRATION_TIME = 300000; // 5 minutes in milliseconds
const generateCacheKey = (method, url, data) => {
    return method === 'get' ? `${url}?${new URLSearchParams(data).toString()}` : url;
};

// Function to handle API errors
const handleApiError = (error) => {
    if (!error.response) {
        return { message: 'Network error. Please check your connection.' };
    }

    switch (error.response.status) {
        case 400:
            return { message: 'Bad Request. Please check your input.' };
        case 401:
            return { message: 'Unauthorized. Please log in again.' };
        case 403:
            return { message: 'Forbidden. You do not have permission.' };
        case 404:
            return { message: 'Resource not found.' };
        case 500:
            return { message: 'Server error. Please try again later.' };
        default:
            return error.response.data || { message: 'An unexpected error occurred.' };
    }
};

// Function to handle CSRF token
const handleCsrfToken = (data) => {
    if (data.csrfToken) {
        document.cookie = `csrfToken=${data.csrfToken}; path=/; secure; SameSite=Strict;`;
        console.log('CSRF token received:', data.csrfToken);
    }
};

// Function to store tokens in cookies
const storeTokens = (accessToken, refreshToken) => {
    document.cookie = `accessToken=${accessToken}; path=/; secure; SameSite=Strict; httpOnly;`;
    document.cookie = `refreshToken=${refreshToken}; path=/; secure; SameSite=Strict; httpOnly;`;
};

// Function to refresh access token
const refreshAccessToken = async () => {
    try {
        const response = await axiosInstance.post('auth/refresh'); // Assuming your refresh endpoint is at 'auth/refresh'
        const { accessToken, csrfToken } = response.data;
        storeTokens(accessToken, response.data.refreshToken); // Store new tokens
        handleCsrfToken(response.data); // Update CSRF token
        return accessToken;
    } catch (error) {
        console.error('Failed to refresh access token:', error.message);
        throw handleApiError(error);
    }
};

// Function to make API requests
const makeApiRequest = async (method, url, data) => {
    const cacheKey = generateCacheKey(method, url, data);

    if (method === 'get' && cache.has(cacheKey)) {
        const { timestamp, response } = cache.get(cacheKey);
        if (Date.now() - timestamp < CACHE_EXPIRATION_TIME) {
            console.log('Fetching from cache:', cacheKey);
            return response;
        }
        cache.delete(cacheKey);
    }

    try {
        const response = await axiosInstance[method](url, data);
        console.log('Server Response:', response.data);
        handleCsrfToken(response.data);

        if (method === 'get') {
            cache.set(cacheKey, { timestamp: Date.now(), response: response.data });
        }
        
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // Attempt to refresh access token and retry the request
            const newAccessToken = await refreshAccessToken();
            if (newAccessToken) {
                data.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return await axiosInstance[method](url, data); // Retry the request
            }
        }
        throw handleApiError(error);
    }
};

// Function to batch requests
const batchRequests = async (requests) => {
    const results = await Promise.allSettled(requests.map(({ method, url, data }) => makeApiRequest(method, url, data)));
    return results.map(result => result.status === 'fulfilled' ? result.value : null);
};

// Function to register a super admin
export const registerSuperAdmin = (data) => makeApiRequest('post', 'auth/superadmin/register', data);

// Function to login a super admin
export const loginSuperAdmin = (data) => makeApiRequest('post', 'auth/superadmin/login', data);

// Function to register a restaurant owner
export const registerRestaurantOwner = (data) => makeApiRequest('post', 'auth/restaurantowner/register', data);

// Function to login a restaurant owner
export const loginRestaurantOwner = (data) => makeApiRequest('post', 'auth/restaurantowner/login', data);

// Function to get the restaurant owner's profile
export const getRestaurantOwnerProfile = (ownerId) => {
    return makeApiRequest('get', `users/profile/${ownerId}`);
};



// Function to get all restaurants
export const getAllRestaurants = (filters) => makeApiRequest('get', '/users/restaurants', { params: filters });

// Function to get a specific restaurant by ID
export const getRestaurantById = (restaurantId) => makeApiRequest('get', `users/restaurants/${restaurantId}`);

// Function to log out the user
export const logoutUser = async () => {
    try {
        await makeApiRequest('post', 'auth/logout'); // Assuming your logout endpoint is at 'auth/logout'
        cache.clear(); // Clear cache on logout
        console.log('User logged out successfully');
    } catch (error) {
        console.error('Logout failed:', error.message);
    }
};

// Exporting batch request function
export const batchApiRequests = (requests) => batchRequests(requests);
