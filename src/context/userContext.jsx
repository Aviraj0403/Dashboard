import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (data) => {
    return new Promise((resolve) => {
      if (data.username === "admin@12" && data.password === "admin") {
        setIsAdmin(true);
        setIsLoggedIn(true);
        resolve(true);
      } else {
        setIsAdmin(false);
        setIsLoggedIn(true);
        resolve(false);
      }
    });
  };

  return (
    <AuthContext.Provider value={{ isAdmin, isLoggedIn, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
