import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SuperAdminDashboard = () => {
  const [owners, setOwners] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [ownersResponse, restaurantsResponse] = await Promise.all([
          axios.get('http://localhost:4000/api/users', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          }),
          axios.get('http://localhost:4000/api/restaurants', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          })
        ]);
        setOwners(ownersResponse.data);
        setRestaurants(restaurantsResponse.data);
      } catch (err) {
        setError('Error fetching data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateOwner = async () => {
    const username = prompt('Enter restaurant owner username:');
    const email = prompt('Enter restaurant owner email:');
    const password = prompt('Enter password:');

    if (!username || !email || !password) {
      alert('All fields are required!');
      return;
    }

    try {
      await axios.post('http://localhost:4000/api/users/register', { username, email, password }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      // Refresh owners list after creation
      setOwners(prev => [...prev, { username, email }]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create owner');
    }
  };

  const handleDeleteOwner = async (ownerId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this owner?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:4000/api/users/${ownerId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setOwners(prev => prev.filter(owner => owner._id !== ownerId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete owner');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Super Admin Dashboard</h1>
      <button onClick={handleCreateOwner}>Create Restaurant Owner</button>
      
      <h2>Restaurant Owners</h2>
      <ul>
        {owners.map(owner => (
          <li key={owner._id}>
            {owner.username} <button onClick={() => handleDeleteOwner(owner._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Restaurants</h2>
      <ul>
        {restaurants.map(restaurant => <li key={restaurant._id}>{restaurant.name}</li>)}
      </ul>
    </div>
  );
};

export default SuperAdminDashboard;
