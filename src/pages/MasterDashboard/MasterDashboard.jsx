import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/userContext';

const MasterDashboard = () => {
  const { user } = useAuth();
  const [owners, setOwners] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ownersResponse = await axios.get('/api/master/owners', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setOwners(ownersResponse.data);

        const restaurantsResponse = await axios.get('/api/master/restaurants', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setRestaurants(restaurantsResponse.data);
      } catch (error) {
        console.error('Data fetch failed:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Welcome, {user?.fullName}</h1>
      <h2>Owners</h2>
      <ul>
        {owners.map(owner => (
          <li key={owner._id}>{owner.fullName} - {owner.email}</li>
        ))}
      </ul>
      <h2>Restaurants</h2>
      <ul>
        {restaurants.map(restaurant => (
          <li key={restaurant._id}>{restaurant.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MasterDashboard;
