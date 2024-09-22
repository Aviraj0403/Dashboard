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
  const [userData, setUserData] = useState(null);

  const handleLogin = async (credentials) => {
    const { username, password } = credentials;
  
    try {
      let data;
  
      if (username.includes('@')) {
        data = await loginRestaurantOwner({ email: username, password });
        setUserRole('restaurantOwner');
        localStorage.setItem('userRole', 'restaurantOwner'); // Store role immediately
      } else {
        data = await loginSuperAdmin({ username, password });
        setUserRole('superAdmin');
        localStorage.setItem('userRole', 'superAdmin'); // Store role immediately
      }
  
      if (data) {
        console.log("User Data:", data); 
        setIsLoggedIn(true);
        setUserData(data);
        // Store the login state in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userData', JSON.stringify(data));
      }
      return true; // Successful login
    } catch (error) {
      setIsLoggedIn(false);
      setUserRole(null);
      setUserData(null);
      return false; // Failed login
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Clear localStorage
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setUserRole(null);
    setUserData(null);
  };

  // Update localStorage whenever isLoggedIn or userRole changes
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
    localStorage.setItem('userRole', userRole);
  }, [isLoggedIn, userRole]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, userData, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
