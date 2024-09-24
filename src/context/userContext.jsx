// AuthProvider.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginSuperAdmin, loginRestaurantOwner, logoutUser as apiLogoutUser } from '../service/userApi.js';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => Cookies.get('isLoggedIn') === 'true');
  const [userRole, setUserRole] = useState(() => Cookies.get('userRole') || null);
  const [userData, setUserData] = useState(() => {
    const data = Cookies.get('userData');
    return data ? JSON.parse(data) : null;
  });

  const handleLogin = async (credentials) => {
    const { username, password } = credentials;

    try {
      let data;
      if (username.includes('@')) {
        data = await loginRestaurantOwner({ email: username, password });
        setUserRole('restaurantOwner');
      } else {
        data = await loginSuperAdmin({ username, password });
        setUserRole('superAdmin');
      }

      if (data) {
        console.log("User Data:", data);
        setIsLoggedIn(true);
        setUserData(data);

        // Store tokens and user info in cookies
        Cookies.set('isLoggedIn', 'true', { expires: 7 });
        Cookies.set('userRole', userRole, { expires: 7 });
        Cookies.set('userData', JSON.stringify(data), { expires: 7 });
      }
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoggedIn(false);
      setUserRole(null);
      setUserData(null);
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      await apiLogoutUser(); // Call API to handle logout on the server
      Cookies.remove('isLoggedIn');
      Cookies.remove('userRole');
      Cookies.remove('userData');
      setIsLoggedIn(false);
      setUserRole(null);
      setUserData(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Sync cookie values with state
  useEffect(() => {
    Cookies.set('isLoggedIn', isLoggedIn, { expires: 7 });
    Cookies.set('userRole', userRole || '', { expires: 7 });
  }, [isLoggedIn, userRole]);

  useEffect(() => {
    if (userData) {
      Cookies.set('userData', JSON.stringify(userData), { expires: 7 });
    } else {
      Cookies.remove('userData'); // Clear userData cookie if userData is null
    }
  }, [userData]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, userData, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
