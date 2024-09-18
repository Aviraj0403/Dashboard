import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false); // New state for super admin
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (data) => {
    return new Promise((resolve) => {
      // Logic to handle login
      if (data.username === "admin@12" && data.password === "admin") {
        setIsAdmin(true);
        setIsSuperAdmin(false); // Not a super admin
        setIsLoggedIn(true);
        resolve(true);
      } else if (data.username === "superadmin@12" && data.password === "superadmin") {
        setIsAdmin(false); // Not a regular admin
        setIsSuperAdmin(true); // Set super admin
        setIsLoggedIn(true);
        resolve(true);
      } else {
        setIsAdmin(false);
        setIsSuperAdmin(false);
        setIsLoggedIn(false);
        resolve(false);
      }
    });
  };

  return (
    <AuthContext.Provider value={{ isAdmin, isSuperAdmin, isLoggedIn, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
