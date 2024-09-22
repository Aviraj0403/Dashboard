import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginSuperAdmin, loginRestaurantOwner } from '../service/userApi.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check localStorage for initial logged-in state
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [userRole, setUserRole] = useState(() => {
    // Check localStorage for initial user role
    return localStorage.getItem('userRole');
  });
  const [userData, setUserData] = useState(() => {
    // Check localStorage for initial user data
    const data = localStorage.getItem('userData');
    return data ? JSON.parse(data) : null;
  });

  const handleLogin = async (credentials) => {
    const { username, password } = credentials;

    try {
      let data;

      // Determine the login method based on the username format
      if (username.includes('@')) {
        data = await loginRestaurantOwner({ email: username, password });
        setUserRole('restaurantOwner');
      } else {
        data = await loginSuperAdmin({ username, password });
        setUserRole('superAdmin');
      }

      // If login is successful
      if (data) {
        console.log("User Data:", data);
        setIsLoggedIn(true);
        setUserData(data);

        // Store the login state and user data in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', userRole);
        localStorage.setItem('userData', JSON.stringify(data));
      }
      return true; // Successful login
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoggedIn(false);
      setUserRole(null);
      setUserData(null);
      return false; // Failed login
    }
  };

  const handleLogout = () => {
    // Clear localStorage and update state
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    setUserRole(null);
    setUserData(null);
  };

  // Update localStorage whenever isLoggedIn or userRole changes
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
    localStorage.setItem('userRole', userRole);
  }, [isLoggedIn, userRole]);

  // Optional: Sync userData to localStorage whenever it changes
  useEffect(() => {
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }, [userData]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, userData, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
