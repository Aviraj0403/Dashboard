// components/secureRoute/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/userContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { isLoggedIn, isAdmin, isSuperAdmin } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles.includes('superAdmin') && isSuperAdmin) {
    return <Outlet />;
  }

  if (allowedRoles.includes('admin') && isAdmin) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoute;
