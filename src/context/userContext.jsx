import React, { createContext, useContext, useState } from 'react';
import { loginSuperAdmin, loginRestaurantOwner } from '../service/userApi.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userData, setUserData] = useState(null);

  const handleLogin = async (credentials) => {
    const { username, password } = credentials;
    console.log('Attempting to log in with:', credentials);

    try {
      let data;

      // Check if the input is an email or a username
      if (username.includes('@')) {
        console.log('Detected email login.');
        data = await loginRestaurantOwner({ email: username, password });
        setUserRole('restaurantOwner');
      } else {
        console.log('Detected username login.');
        data = await loginSuperAdmin({ username, password });
        setUserRole('superAdmin');
      }

      // Log the received data
      console.log('Login successful, received data:', data);

      // Only set logged in state if login was successful
      if (data) {
        setIsLoggedIn(true);
        setUserData(data);
        console.log('User logged in:', data);
      }
      return true; // Successful login
    } catch (error) {
      console.error('Login error:', error);
      setIsLoggedIn(false);
      setUserRole(null);
      setUserData(null);
      return false; // Failed login
    }
  };

  const handleLogout = () => {
    console.log('Logging out user.');
    setIsLoggedIn(false);
    setUserRole(null);
    setUserData(null);
  };

  // Log state changes for debugging
  console.log('AuthProvider state - isLoggedIn:', isLoggedIn, ', userRole:', userRole, ', userData:', userData);

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, userData, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
