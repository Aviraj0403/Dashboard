// RestaurantList.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../Interceptors/axiosInstance.js';

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [filter, setFilter] = useState({ status: 'all', owner: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRestaurants = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get('/restaurants');
                setRestaurants(response.data.restaurants || []);
            } catch (error) {
                console.error("Error fetching restaurants:", error);
                setError('Failed to fetch restaurants');
            } finally {
                setLoading(false);
            }
        };
    
        fetchRestaurants();
    }, []);
    
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter({ ...filter, [name]: value });
    };

    const filteredRestaurants = restaurants.filter((restaurant) => {
        const matchesStatus = filter.status === 'all' || restaurant.subscriptionRecords.some(record => record.status === filter.status);
        const matchesOwner = restaurant.ownerId?.username.toLowerCase().includes(filter.owner.toLowerCase());
        return matchesStatus && matchesOwner;
    });

    const sendAlert = async (restaurantId) => {
        setError('');
        try {
            await axiosInstance.post(`/restaurants/${restaurantId}/send-alert`);
            alert('Subscription reminder sent!');
        } catch (error) {
            console.error('Error sending alert:', error);
            setError('Failed to send subscription reminder: ' + (error.response?.data.message || 'Unknown error'));
        }
    };
    

    const extendSubscription = async (restaurantId, additionalMonths) => {
        setError('');
        try {
            await axiosInstance.put(`/restaurants/${restaurantId}/extend-subscription`, { additionalMonths });
            alert('Subscription extended successfully');
        } catch (error) {
            console.error('Error extending subscription:', error);
            setError('Failed to extend subscription: ' + (error.response?.data.message || 'Unknown error'));
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Filter Subscriptions</h2>
            <div className="mb-4">
                <select
                    name="status"
                    value={filter.status}
                    onChange={handleFilterChange}
                    className="w-full p-2 border rounded-md mb-2"
                >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="expired">Expired</option>
                </select>
                <input
                    type="text"
                    name="owner"
                    value={filter.owner}
                    onChange={handleFilterChange}
                    placeholder="Filter by Owner"
                    className="w-full p-2 border rounded-md"
                />
            </div>

            <h2 className="text-xl font-semibold mb-4">All Restaurants</h2>
            {loading ? (
                <p>Loading restaurants...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-2 px-4 text-left">Name</th>
                                <th className="py-2 px-4 text-left">Owner</th>
                                <th className="py-2 px-4 text-left">Location</th>
                                <th className="py-2 px-4 text-left">Subscription Status</th>
                                <th className="py-2 px-4 text-left">Expiry Date</th>
                                <th className="py-2 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRestaurants.map((restaurant) => (
                                <tr key={restaurant._id} className="border-b">
                                    <td className="py-2 px-4">{restaurant.name}</td>
                                    <td className="py-2 px-4">{restaurant.ownerId?.username || 'N/A'}</td>
                                    <td className="py-2 px-4">{restaurant.location}</td>
                                    <td className={`py-2 px-4 ${restaurant.subscriptionRecords.some(record => record.status === 'expired') ? 'text-red-500' : 'text-green-500'}`}>
                                        {restaurant.subscriptionRecords.some(record => record.status === 'expired') ? 'Expired' : 'Active'}
                                    </td>
                                    <td className="py-2 px-4">
                                        {restaurant.subscriptionRecords.length > 0 ? 
                                            new Date(restaurant.subscriptionRecords[0].endDate).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="py-2 px-4">
                                        {restaurant.subscriptionRecords.some(record => record.status === 'expired') ? (
                                            <div className="flex space-x-4">
                                                <button
                                                    onClick={() => sendAlert(restaurant._id)}
                                                    className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition duration-200"
                                                >
                                                    Send Reminder
                                                </button>
                                                <button
                                                    onClick={() => extendSubscription(restaurant._id, 3)}
                                                    className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition duration-200"
                                                >
                                                    Extend 3 months
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-green-500">Active</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default RestaurantList;
