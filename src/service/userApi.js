import axiosInstance from '../Interceptors/axiosInstance.js';

// Function to handle API errors
const handleApiError = (error) => {
    console.error('API error:', error);
    if (error.response && error.response.data) {
        return error.response.data; // Specific error from the server
    }
    return { message: 'An unexpected error occurred. Please try again later.' };
};

// Function to register a super admin
export const registerSuperAdmin = async (data) => {
    try {
        const response = await axiosInstance.post('auth/superadmin/register', data);
        return response.data; // Returns the response data
    } catch (error) {
        throw handleApiError(error); // Use the error handler
    }
};

// Function to login a super admin
export const loginSuperAdmin = async (data) => {
    try {
        const response = await axiosInstance.post('auth/superadmin/login', data);
        if (response.data.accessToken) { // Make sure you're accessing the correct key
            console.log('Token received:', response.data.accessToken);
            localStorage.setItem('token', response.data.accessToken); // Store token
        }
        return response.data; // Returns the response data
    } catch (error) {
        throw handleApiError(error); // Use the error handler
    }
};

// Function to register a restaurant owner
export const registerRestaurantOwner = async (data) => {
    try {
        const response = await axiosInstance.post('auth/restaurantowner/register', data);
        return response.data; // Returns the response data
    } catch (error) {
        throw handleApiError(error); // Use the error handler
    }
};

// Function to login a restaurant owner
export const loginRestaurantOwner = async (data) => {
    try {
        const response = await axiosInstance.post('auth/restaurantowner/login', data);
        if (response.data.accessToken) { // Make sure you're accessing the correct key
            localStorage.setItem('token', response.data.accessToken); // Store token
        }
        return response.data; // Returns the response data
    } catch (error) {
        throw handleApiError(error); // Use the error handler
    }
};

// Function to get the restaurant owner's profile
export const getRestaurantOwnerProfile = async (ownerId) => {
    try {
        const response = await axiosInstance.get(`users/profile/${ownerId}`);
        return response.data; // Returns the response data
    } catch (error) {
        throw handleApiError(error); // Use the error handler
    }
};

export const getAllRestaurants = async (filters) => {
    try {
        const response = await axiosInstance.get('/users/restaurants');
        return response.data; // Returns the response data
    } catch (error) {
        throw handleApiError(error); // Use the error handler
    }
};

// Function to get a specific restaurant by ID
export const getRestaurantById = async (restaurantId) => {
    try {
        const response = await axiosInstance.get(`users/restaurants/${restaurantId}`);
        return response.data; // Returns the response data
    } catch (error) {
        throw handleApiError(error); // Use the error handler
    }
};