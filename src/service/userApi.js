import axiosInstance from '../Interceptors/axiosInstance.js';

// Cache to store responses and their timestamps
const cache = new Map();
const CACHE_EXPIRATION_TIME = 300000; // 5 minutes

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
    cache.delete(cacheKey);  // Cache expired, delete it
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

  // Check cache for GET requests
  const cachedResponse = checkCache(method, cacheKey);
  if (cachedResponse) return cachedResponse;

  try {
    const response = await axiosInstance[method](url, data);
    console.log('Server Response:', response.data);

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

// API Functions for User Authentication & Operations
export const registerSuperAdmin = (data) => makeApiRequest('post', 'auth/superadmin/register', data);
export const loginSuperAdmin = (data) => makeApiRequest('post', 'auth/superadmin/login', data);
export const registerRestaurantOwner = (data) => makeApiRequest('post', 'auth/restaurantowner/register', data);
export const loginRestaurantOwner = (data) => makeApiRequest('post', 'auth/restaurantowner/login', data);
export const getRestaurantOwnerProfile = (ownerId) => makeApiRequest('get', `users/profile/${ownerId}`);
export const getRestaurantById = (restaurantId) => makeApiRequest('get', `users/restaurants/${restaurantId}`);
export const updateRestaurant = (restaurantId, updatedData) => makeApiRequest('put', `users/restaurants/${restaurantId}/`, updatedData);
export const updateSubscriptionRecord = (restaurantId, subscriptionData) => makeApiRequest('put', `users/restaurants/${restaurantId}/subscription`, subscriptionData);

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
