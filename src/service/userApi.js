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
        const response = await axiosInstance.post('/superadmin/register', data);
        return response.data; // Returns the response data
    } catch (error) {
        throw handleApiError(error); // Use the error handler
    }
};

// Function to login a super admin
export const loginSuperAdmin = async (data) => {
    try {
        const response = await axiosInstance.post('/superadmin/login', data);
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
        const response = await axiosInstance.post('/restaurantowner/register', data);
        return response.data; // Returns the response data
    } catch (error) {
        throw handleApiError(error); // Use the error handler
    }
};

// Function to login a restaurant owner
export const loginRestaurantOwner = async (data) => {
    try {
        const response = await axiosInstance.post('/restaurantowner/login', data);
        if (response.data.accessToken) { // Make sure you're accessing the correct key
            localStorage.setItem('token', response.data.accessToken); // Store token
        }
        return response.data; // Returns the response data
    } catch (error) {
        throw handleApiError(error); // Use the error handler
    }
};
