import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  const handleLogin = async (credentials) => {
    const { username, password } = credentials;

    // Simulate login logic
    if (username === "superadmin@12" && password === "superadmin") {
      setIsLoggedIn(true);
      setIsSuperAdmin(true);
      setIsAdmin(false);
      return true;
    } else if (username === "admin@12" && password === "admin") {
      setIsLoggedIn(true);
      setIsAdmin(true);
      setIsSuperAdmin(false);
      return true;
    }

    // Reset states on failed login
    setIsLoggedIn(false);
    setIsAdmin(false);
    setIsSuperAdmin(false);
    return false;
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, isSuperAdmin, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
