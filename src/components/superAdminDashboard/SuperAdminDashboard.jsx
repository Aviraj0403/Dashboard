import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../Interceptors/axiosInstance.js';
import RegisterRestaurantOwner from './RestaurantManagement/RegisterRestaurantOwner';
import RestaurantList from './RestaurantManagement/RestaurantList';

const SuperAdminDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true; // track if component is mounted

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
            isMounted = false; // cleanup
        };
    }, [navigate]);

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen"><p>Loading...</p></div>;
    }

    if (!isAuthenticated) {
        return <p className="text-red-500">{errorMessage}</p>;
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-8">Super Admin Dashboard</h1>
            <RegisterRestaurantOwner />
            <RestaurantList />
        </div>
    );
};

export default SuperAdminDashboard;
