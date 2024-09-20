import axios from 'axios';

const API_URL ='http://localhost:4000/api/auth'; // Use environment variable for API URL

// Create an axios instance for easier configuration
const apiClient = axios.create({
    baseURL: API_URL,
    timeout: 5000, // Set a timeout for requests
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to handle API errors
const handleApiError = (error) => {
    // Log the error (consider a logging service for production)
    console.error('API error:', error);
    
    // Return a user-friendly error message
    if (error.response && error.response.data) {
        return error.response.data; // Specific error from the server
    }
    return { message: 'An unexpected error occurred. Please try again later.' };
};

// Function to register a super admin
export const registerSuperAdmin = async (data) => {
    try {
        const response = await apiClient.post('/superadmin/register', data);
        return response.data; // Returns the response data
    } catch (error) {
        throw handleApiError(error); // Use the error handler
    }
};

// Function to login a super admin
export const loginSuperAdmin = async (data) => {
    try {
        const response = await apiClient.post('/superadmin/login', data);
        // Store token securely (e.g., in httpOnly cookies if applicable)
        // localStorage.setItem('token', response.data.token);
        return response.data; // Returns the response data
    } catch (error) {
        throw handleApiError(error); // Use the error handler
    }
};

// Function to register a restaurant owner
export const registerRestaurantOwner = async (data) => {
    try {
        const response = await apiClient.post('/restaurantowner/register', data);
        return response.data; // Returns the response data
    } catch (error) {
        throw handleApiError(error); // Use the error handler
    }
};

// Function to login a restaurant owner
// export const loginRestaurantOwner = async (data) => {
//     console.log('Logging in with data:', data);
//     try {
//         const response = await apiClient.post('/restaurantowner/login', {
//             email: data.email,      // Send email separately
//     //   username: data.username, // Send username separately
//              password: data.password,
//         });
//         return response.data; // Returns the response data
//     } catch (error) {
//         throw handleApiError(error); // Use the error handler
//     }
// };
export const loginRestaurantOwner = async (data) => {
    console.log('Logging in with data:', data);
    try {
        const response = await apiClient.post('/restaurantowner/login', data
        );
        return response.data; // Returns the response data
    } catch (error) {
        throw handleApiError(error); // Use the error handler
    }
};
