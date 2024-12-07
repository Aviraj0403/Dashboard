import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('');
    const url = import.meta.env.BACKEND_URL_PROD ||import.meta.env.BACKEND_URL;

    const fetchRestaurants = async (page = 1, limit = 10, status = '') => {
        try {
            const response = await axios.get(`${url}/api/users/restaurants`, {
                params: {
                    page,
                    limit,
                    status,
                },
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.data.restaurants) {
                setRestaurants(response.data.restaurants);
            } else {
                throw new Error(response.data.message || 'Failed to fetch restaurants.');
            }
        } catch (error) {
            console.error('Error fetching restaurants:', error);
            toast.error(error.message || 'Error fetching restaurants');
            setError(error.message || 'Failed to fetch restaurants.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const filteredRestaurants = restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(filter.toLowerCase()) ||
        (restaurant.ownerId?.username || '').toLowerCase().includes(filter.toLowerCase()) ||
        restaurant.location.toLowerCase().includes(filter.toLowerCase()) ||
        (restaurant.ownerId?.email || '').toLowerCase().includes(filter.toLowerCase()) ||
        (restaurant.contactInfo?.phone || '').includes(filter)
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-16 h-16 border-4 border-t-4 border-orange-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto bg-white rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center justify-between mb-6">
                <h4 className="text-2xl font-semibold text-gray-800">Restaurants List</h4>
                <NavLink
                    to="/super-admin-dashboard/register-res-own"
                    className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                >
                    Add Restaurant
                </NavLink>
            </div>

            {error && <div className="mb-4 text-red-500">{error}</div>}

            {/* Filter Input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Filter restaurants..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 w-full sm:w-80"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurant Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner Phone</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredRestaurants.length > 0 ? (
                            filteredRestaurants.map((restaurant) => (
                                <tr key={restaurant._id}>
                                    <td className="px-6 py-4 text-sm text-gray-900">{restaurant.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        <NavLink
                                            to={`/super-admin-dashboard/owner-profile/${restaurant.ownerId?._id}`} // Updated path
                                            className="text-blue-600 hover:underline"
                                        >
                                            {restaurant.ownerId?.username || 'N/A'}
                                        </NavLink>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{restaurant.location}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {restaurant.subscriptionRecords && restaurant.subscriptionRecords.length > 0
                                            ? restaurant.subscriptionRecords[0].status
                                            : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{restaurant.ownerId?.email || 'N/A'}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{restaurant.contactInfo?.phone || 'N/A'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-sm text-gray-500 text-center">No restaurants found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RestaurantList;
