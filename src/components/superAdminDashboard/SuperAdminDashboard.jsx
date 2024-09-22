import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Card } from '@mui/material'; // Importing Material UI components
import axiosInstance from '../../Interceptors/axiosInstance.js';
import RegisterRestaurantOwner from './RestaurantManagement/RegisterRestaurantOwner';
import RestaurantList from './RestaurantManagement/RestaurantList';
import { useAuth } from '../../context/userContext.jsx';

const SuperAdminDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { handleLogout } = useAuth(); // Destructure the handleLogout function from useAuth

    useEffect(() => {
        let isMounted = true; // Track if component is mounted

        const checkAuthentication = async () => {
            try {
                const response = await axiosInstance.get('/check-superadmin');
                if (response.status === 200 && isMounted) {
                    setIsAuthenticated(true);
                } else {
                    navigate('/login');
                }
            } catch (error) {
                if (isMounted) {
                    console.error('Authentication check failed:', error.response?.data?.message || error.message);
                    setErrorMessage("Please log in to access this page.");
                    setIsAuthenticated(false);
                    navigate('/login');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        checkAuthentication();

        return () => {
            isMounted = false; // Cleanup to avoid setting state on unmounted component
        };
    }, [navigate]);

    const handleLogoutClick = () => {
        // Clear any relevant authentication tokens or data
        localStorage.removeItem('token');
        handleLogout(); // Clear the JWT and log the user out
        navigate('/login');
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen"><p>Loading...</p></div>;
    }

    if (!isAuthenticated) {
        return <p className="text-red-500">{errorMessage}</p>;
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Header with Logout Button */}
            <header className="flex justify-between items-center bg-white shadow p-4 mb-8">
                <Typography variant="h4" className="font-bold">Super Admin Dashboard</Typography>
                <Button variant="contained" color="secondary" onClick={handleLogoutClick}>Logout</Button>
            </header>

            {/* Dashboard Content */}
            <main>
                <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 py-3">
                    <Card className="p-6 shadow-md bg-blue-100">
                        <Typography variant="h5" className="font-bold mb-4">Register New Restaurant Owner</Typography>
                        <RegisterRestaurantOwner />
                    </Card>
                    <Card className="p-6 shadow-md bg-green-100">
                        <Typography variant="h5" className="font-bold mb-4">Restaurant List</Typography>
                        <RestaurantList />
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default SuperAdminDashboard;
