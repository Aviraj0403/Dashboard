import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/userContext';

const ProtectedRoute = () => {
    const {isAdmin} = useAuth()
//   const isAuthenticated = ""

  return isAdmin ?  <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
