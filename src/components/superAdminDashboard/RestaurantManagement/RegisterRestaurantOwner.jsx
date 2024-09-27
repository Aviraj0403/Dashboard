import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../Interceptors/axiosInstance.js';

const RegisterRestaurantOwner = () => {
    const navigate = useNavigate();
    const [ownerData, setOwnerData] = useState({
        username: '',
        email: '',
        password: '',
        restaurantName: '',
        restaurantLocation: '',
        contactInfo: { phone: '', email: '' },
        subscription: { plan: 'monthly', paymentMethod: 'creditCard' } // Default values for subscription
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            setOwnerData(prev => ({
                ...prev,
                contactInfo: { ...prev.contactInfo, phone: value }
            }));
        } else if (name === 'contactEmail') {
            setOwnerData(prev => ({
                ...prev,
                contactInfo: { ...prev.contactInfo, email: value }
            }));
        } else if (name === 'plan' || name === 'paymentMethod') {
            setOwnerData(prev => ({
                ...prev,
                subscription: { ...prev.subscription, [name]: value }
            }));
        } else {
            setOwnerData(prev => ({ ...prev, [name]: value }));
        }
    };

    const validateForm = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordStrengthPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (!emailPattern.test(ownerData.email)) {
            setError('Invalid email format.');
            return false;
        }

        if (!passwordStrengthPattern.test(ownerData.password)) {
            setError('Password must be at least 8 characters long and contain at least one letter and one number.');
            return false;
        }

        return true;
    };

    const handleOwnerSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!validateForm()) {
            setLoading(false);
            return;
        }

        try {
            await axiosInstance.post('auth/restaurantowner/register', ownerData);
            alert('Restaurant owner and restaurant created successfully');
            setOwnerData({ 
                username: '', email: '', password: '', 
                restaurantName: '', restaurantLocation: '', 
                contactInfo: { phone: '', email: '' },
                subscription: { plan: 'monthly', paymentMethod: 'creditCard' }
            });
        } catch (error) {
            console.error('Error creating owner and restaurant:', error.response || error);
            setError('Failed to create owner and restaurant: ' + (error.response?.data.message || 'Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-10 transition-transform duration-500 ease-in-out transform opacity-100 translate-y-0 animate-fadeInUp">
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Register New Restaurant Owner</h2>
            {error && <p className="text-red-500 text-center">{error}</p>}

            <button
                className="mb-4 text-blue-600 hover:text-blue-800 transition duration-300"
                onClick={() => navigate('/super-admin-dashboard')} // Navigate to the main page
            >
                &larr; Back to Main
            </button>

            <form className="space-y-4" onSubmit={handleOwnerSubmit}>
                <input
                    type="text"
                    name="username"
                    value={ownerData.username}
                    onChange={handleInputChange}
                    placeholder="Username"
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={ownerData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={ownerData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    required
                />
                <input
                    type="text"
                    name="restaurantName"
                    value={ownerData.restaurantName}
                    onChange={handleInputChange}
                    placeholder="Restaurant Name"
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    required
                />
                <input
                    type="text"
                    name="restaurantLocation"
                    value={ownerData.restaurantLocation}
                    onChange={handleInputChange}
                    placeholder="Restaurant Location"
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    required
                />
                <input
                    type="text"
                    name="phone"
                    value={ownerData.contactInfo.phone}
                    onChange={handleInputChange}
                    placeholder="Phone"
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
                <input
                    type="email"
                    name="contactEmail"
                    value={ownerData.contactInfo.email}
                    onChange={handleInputChange}
                    placeholder="Restaurant Contact Email"
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />

                <div className="flex justify-between space-x-4">
                    <select
                        name="plan"
                        value={ownerData.subscription.plan}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    >
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                    <select
                        name="paymentMethod"
                        value={ownerData.subscription.paymentMethod}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    >
                        <option value="creditCard">Credit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="bankTransfer">Bank Transfer</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 transform hover:scale-105"
                    disabled={loading}
                >
                    {loading ? 'Creating...' : 'Create Owner & Restaurant'}
                </button>
            </form>
        </div>
    );
};

export default RegisterRestaurantOwner;
