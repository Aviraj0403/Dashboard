import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllRestaurants } from '../../../service/userApi.js'; // Adjust the import path accordingly

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);

    const fetchRestaurants = async () => {
        try {
            const response = await getAllRestaurants();
            if (response.success) {
                setRestaurants(response.data);
            } else {
                toast.error(response.message || 'Error fetching restaurants');
            }
        } catch (error) {
            toast.error(error.message || 'Error fetching restaurants');
        }
    };

    useEffect(() => {
        fetchRestaurants();
    }, []);

    return (
        <div className="p-6 max-w-7xl mx-auto bg-white rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center justify-between mb-6">
                <h4 className="text-2xl font-semibold text-gray-800">Restaurants List</h4>
                <NavLink
                    to="/admin/add-restaurant"
                    className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                >
                    Add Restaurant
                </NavLink>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurant Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {restaurants.map((restaurant) => (
                            <tr key={restaurant._id}>
                                <td className="px-6 py-4 text-sm text-gray-900">{restaurant.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{restaurant.ownerId?.username || 'N/A'}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{restaurant.location}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{restaurant.subscriptionStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RestaurantList;
