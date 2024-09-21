import React, { useState } from 'react';
import axiosInstance from '../../../Interceptors/axiosInstance.js';

const RegisterRestaurantOwner = () => {
    const [ownerData, setOwnerData] = useState({
        username: '',
        email: '',
        password: '',
        restaurantName: '',
        restaurantLocation: '',
        contactInfo: { phone: '', email: '' }
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
        } else {
            setOwnerData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleOwnerSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            await axiosInstance.post('/restaurantowner/register', ownerData); // Adjust the endpoint as needed
            alert('Restaurant owner and restaurant created successfully');
            setOwnerData({ 
                username: '', email: '', password: '', 
                restaurantName: '', restaurantLocation: '', 
                contactInfo: { phone: '', email: '' } 
            });
        } catch (error) {
            console.error('Error creating owner and restaurant:', error);
            setError('Failed to create owner and restaurant: ' + (error.response?.data.message || 'Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-10">
            <h2 className="text-xl font-semibold mb-4">Register New Restaurant Owner</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form className="space-y-4" onSubmit={handleOwnerSubmit}>
                <input
                    type="text"
                    name="username"
                    value={ownerData.username}
                    onChange={handleInputChange}
                    placeholder="Username"
                    className="w-full p-2 border rounded-md"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={ownerData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="w-full p-2 border rounded-md"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={ownerData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className="w-full p-2 border rounded-md"
                    required
                />
                <input
                    type="text"
                    name="restaurantName"
                    value={ownerData.restaurantName}
                    onChange={handleInputChange}
                    placeholder="Restaurant Name"
                    className="w-full p-2 border rounded-md"
                    required
                />
                <input
                    type="text"
                    name="restaurantLocation"
                    value={ownerData.restaurantLocation}
                    onChange={handleInputChange}
                    placeholder="Restaurant Location"
                    className="w-full p-2 border rounded-md"
                    required
                />
                <input
                    type="text"
                    name="phone"
                    value={ownerData.contactInfo.phone}
                    onChange={handleInputChange}
                    placeholder="Phone"
                    className="w-full p-2 border rounded-md"
                />
                <input
                    type="email"
                    name="contactEmail" // Ensure this matches your handler
                    value={ownerData.contactInfo.email}
                    onChange={handleInputChange}
                    placeholder="Restaurant Contact Email"
                    className="w-full p-2 border rounded-md"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
                    disabled={loading}
                >
                    {loading ? 'Creating...' : 'Create Owner & Restaurant'}
                </button>
            </form>
        </div>
    );
};

export default RegisterRestaurantOwner;
