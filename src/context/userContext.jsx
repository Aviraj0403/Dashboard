import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginSuperAdmin, loginRestaurantOwner } from '../service/userApi.js';
import Cookies from 'js-cookie'; // Make sure to install js-cookie

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return Cookies.get('isLoggedIn') === 'true';
  });
  const [userRole, setUserRole] = useState(() => {
    return Cookies.get('userRole');
  });
  const [userData, setUserData] = useState(() => {
    const data = Cookies.get('userData');
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

        // Store the login state and user data in cookies
        Cookies.set('isLoggedIn', 'true', { expires: 7 }); // Expires in 7 days
        Cookies.set('userRole', userRole, { expires: 7 }); // Use updated userRole
        Cookies.set('userData', JSON.stringify(data), { expires: 7 });
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
    // Clear cookies and update state
    Cookies.remove('isLoggedIn');
    Cookies.remove('userRole');
    Cookies.remove('userData');
    setIsLoggedIn(false);
    setUserRole(null);
    setUserData(null);
  };

  // Update cookies whenever isLoggedIn or userRole changes
  useEffect(() => {
    Cookies.set('isLoggedIn', isLoggedIn, { expires: 7 });
    Cookies.set('userRole', userRole || '', { expires: 7 });
  }, [isLoggedIn, userRole]);

  // Sync userData to cookies whenever it changes
  useEffect(() => {
    if (userData) {
      Cookies.set('userData', JSON.stringify(userData), { expires: 7 });
    }
  }, [userData]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, userData, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
