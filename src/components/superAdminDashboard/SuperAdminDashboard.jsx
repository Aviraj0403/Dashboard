import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SuperAdminDashboard = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filter, setFilter] = useState('all');
  const [ownerData, setOwnerData] = useState({ username: '', email: '', password: '' });

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('/api/restaurants');
        console.log("Fetched restaurants:", response.data); // Debugging line
        setRestaurants(response.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOwnerData({ ...ownerData, [name]: value });
  };

  const handleOwnerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/restaurant-owners', ownerData);
      alert('Restaurant owner created successfully');
    } catch (error) {
      console.error('Error creating owner:', error);
      alert('Failed to create owner');
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredRestaurants = restaurants.filter((restaurant) => {
    if (filter === 'active') return restaurant.subscriptionStatus === 'active';
    if (filter === 'expired') return restaurant.subscriptionStatus === 'expired';
    return true;
  });

  const sendAlert = async (restaurantId) => {
    try {
      await axios.post(`/api/restaurants/${restaurantId}/send-alert`);
      alert('Subscription reminder sent!');
    } catch (error) {
      console.error('Error sending alert:', error);
      alert('Failed to send subscription reminder');
    }
  };

  const extendSubscription = async (restaurantId, additionalMonths) => {
    try {
      await axios.put(`/api/restaurants/${restaurantId}/extend-subscription`, { additionalMonths });
      alert('Subscription extended successfully');
    } catch (error) {
      console.error('Error extending subscription:', error);
      alert('Failed to extend subscription');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Super Admin Dashboard</h1>

      {restaurants.length === 0 ? (
        <p className="text-center">No restaurants found.</p>
      ) : (
        <>
          {/* Register New Owner Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-10">
            <h2 className="text-xl font-semibold mb-4">Register New Restaurant Owner</h2>
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
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Create Owner
              </button>
            </form>
          </div>

          {/* Filter and Restaurant Table */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Filter Subscriptions</h2>
            <select
              value={filter}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-md mb-6"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
            </select>

            <h2 className="text-xl font-semibold mb-4">All Restaurants</h2>
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
                      <td className={`py-2 px-4 ${restaurant.subscriptionStatus === 'expired' ? 'text-red-500' : 'text-green-500'}`}>
                        {restaurant.subscriptionStatus}
                      </td>
                      <td className="py-2 px-4">{new Date(restaurant.subscriptionExpiryDate).toLocaleDateString()}</td>
                      <td className="py-2 px-4">
                        {restaurant.subscriptionStatus === 'expired' ? (
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
          </div>
        </>
      )}
    </div>
  );
};

export default SuperAdminDashboard;
