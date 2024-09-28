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
        // Restaurant owner login
        data = await loginRestaurantOwner({ email: username, password });
        setUserRole('restaurantOwner');
      } else {
        // Super Admin login
        data = await loginSuperAdmin({ username, password });
        setUserRole('superAdmin');
      }

      if (data) {
        console.log("User Data:", data);
        setIsLoggedIn(true);
        setUserData(data);
        console.log("Restaurant ID:", data.user.restaurantId);
        // Store minimal user state in cookies (including restaurantId if available)
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
      await apiLogoutUser();
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

  useEffect(() => {
    Cookies.set('isLoggedIn', isLoggedIn, { expires: 7 });
    Cookies.set('userRole', userRole || '', { expires: 7 });
  }, [isLoggedIn, userRole]);

  useEffect(() => {
    if (userData) {
      Cookies.set('userData', JSON.stringify(userData), { expires: 7 });
    } else {
      Cookies.remove('userData');
    }
  }, [userData]);

  // Get the restaurantId from userData if the role is 'restaurantOwner'
  const restaurantId = userRole === 'restaurantOwner' && userData ? userData.user.restaurantId : null;

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, userData, restaurantId, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
// New custom hook to get restaurantId
export const useRestaurantId = () => {
  const { restaurantId } = useAuth();
  return restaurantId;
};