import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};
export const AuthContextProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const handleLogin = (data) => {
    if (data.username === "admin@12" && data.password === "admin") {
      alert("Login success");
      setIsAdmin(true);
    }
  };
  return (
    <AuthContext.Provider value={{ isAdmin, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
