import axiosInstance from '../Interceptors/axiosInstance.js';

// Cache to store responses and their timestamps
const cache = new Map();
const CACHE_EXPIRATION_TIME = 300000; // Default 5 minutes

// Generate a cache key based on method, URL, and data
const generateCacheKey = (method, url, data) => {
    return method === 'get' ? `${url}?${new URLSearchParams(data).toString()}` : url;
};

// Cache Management
const checkCache = (method, cacheKey) => {
    if (method === 'get' && cache.has(cacheKey)) {
        const { timestamp, response } = cache.get(cacheKey);
        if (Date.now() - timestamp < CACHE_EXPIRATION_TIME) {
            console.log('Fetching from cache:', cacheKey);
            return response;
        }
        cache.delete(cacheKey);
    }
    return null;
};

const setCache = (method, cacheKey, responseData) => {
    if (method === 'get') {
        cache.set(cacheKey, { timestamp: Date.now(), response: responseData });
    }
};

// Centralized Error Handling
const handleApiError = (error) => {
    if (!error.response) {
        return { message: 'Network error. Please check your connection.' };
    }

    const errorMessages = {
        400: 'Bad Request. Please check your input.',
        401: 'Unauthorized. Please log in again.',
        403: 'Forbidden. You do not have permission.',
        404: 'Resource not found.',
        500: 'Server error. Please try again later.',
    };

    return { message: errorMessages[error.response.status] || 'An unexpected error occurred.' };
};

// CSRF Token Handling
const handleCsrfToken = (data) => {
    if (data.csrfToken) {
        document.cookie = `csrfToken=${data.csrfToken}; path=/; secure; SameSite=Strict;`;
        console.log('CSRF token received:', data.csrfToken);
    }
};

// Access Token Refresh
const refreshAccessToken = async () => {
    try {
        const response = await axiosInstance.post('auth/refresh-token', {}, { withCredentials: true });
        console.log('Access token refreshed:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to refresh access token:', error.message);
        return null;
    }
};

// Retry Logic with Limits
const retryRequest = async (method, url, data, retryCount = 0, maxRetries = 2) => {
    if (retryCount >= maxRetries) throw new Error('Max retries exceeded');
    const refreshedData = await refreshAccessToken();
    if (refreshedData) {
        return makeApiRequest(method, url, data, retryCount + 1);
    }
    throw new Error('Failed to refresh token');
};

// API Request Function with Retry and Caching
const makeApiRequest = async (method, url, data = {}, retryCount = 0) => {
    const cacheKey = generateCacheKey(method, url, data);

    // Check cache
    const cachedResponse = checkCache(method, cacheKey);
    if (cachedResponse) return cachedResponse;

    try {
        // Make API request with credentials and headers
        const response = await axiosInstance[method](url, data, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        });
        console.log('Server Response:', response.data);

        // Handle CSRF token
        handleCsrfToken(response.data);

        // Cache GET responses
        setCache(method, cacheKey, response.data);

        return response.data;
    } catch (error) {
        // Handle 401 errors by retrying with token refresh
        if (error.response && error.response.status === 401) {
            return retryRequest(method, url, data, retryCount);
        }
        // Handle other errors
        throw handleApiError(error);
    }
};

// Logout user and clear cache & cookies
export const logoutUser = async () => {
    try {
        await makeApiRequest('post', 'auth/logout');
        document.cookie = 'accessToken=; Max-Age=0; path=/;';
        document.cookie = 'refreshToken=; Max-Age=0; path=/;';
        cache.clear(); // Clear cache on logout
        console.log('User logged out successfully');
    } catch (error) {
        console.error('Logout failed:', error.message);
    }
};

// API Functions

// Super Admin registration
export const registerSuperAdmin = (data) => makeApiRequest('post', 'auth/superadmin/register', data);

// Super Admin login
export const loginSuperAdmin = (data) => makeApiRequest('post', 'auth/superadmin/login', data);

// Restaurant Owner registration
export const registerRestaurantOwner = (data) => makeApiRequest('post', 'auth/restaurantowner/register', data);

// Restaurant Owner login
export const loginRestaurantOwner = (data) => makeApiRequest('post', 'auth/restaurantowner/login', data);

// Get profile of a restaurant owner
export const getRestaurantOwnerProfile = (ownerId) => makeApiRequest('get', `users/profile/${ownerId}`);

// Get all restaurants with filters
// export const getAllRestaurants = ({ status, page = 1, limit = 10 }) => {
//     return makeApiRequest('get', '/users/restaurants', { status, page, limit });
// };

// Get restaurant by its ID
export const getRestaurantById = (restaurantId) => makeApiRequest('get', `users/restaurants/${restaurantId}`);
// Update subscription record
// export const updateSubscriptionRecord = (recordId, updatedData) => 
//   makeApiRequest('put', `users/restaurants/${restaurantId}/subscription`, updatedData);

// Update restaurant
export const updateRestaurant = (restaurantId, updatedData) => 
  makeApiRequest('put', `users/restaurants/${restaurantId}/`, updatedData);

// Update subscription record
// export const updateSubscriptionRecord = async (restaurantId, subscriptionData) => {
//   try {
//       console.log('Updating subscription for restaurant ID:', restaurantId);
//       console.log('Subscription data:', subscriptionData);
      
//       const response = await axiosInstance.put(`/users/restaurants/${restaurantId}/subscription`, subscriptionData);
//       console.log('Subscription updated successfully:', response.data);
//       return response.data;
//   } catch (error) {
//       console.error('Error updating subscription:', error);
//       // Handle error more gracefully if needed
//       throw error;
//   }
// };

export const updateSubscriptionRecord = (restaurantId, subscriptionData) => 
  makeApiRequest('put', `users/restaurants/${restaurantId}/subscription`, subscriptionData);