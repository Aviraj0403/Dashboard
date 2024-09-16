import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/userContext';

const OwnerDashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/owner/users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Fetch users failed:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Welcome, {user?.fullName}</h1>
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.fullName} - {user.email} - {user.role}</li>
        ))}
      </ul>
    </div>
  );
};

export default OwnerDashboard;
