import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('auth');

  if (!token) {
    return <Navigate to="/login" />;
  }

  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch (error) {
    console.error("Invalid token.");
    return <Navigate to="/login" />;
  }
  if (!allowedRoles.includes(decoded.role)) {
    console.error("Access denied. You do not have permission to access this page.");
  }

  return children;
};

export default ProtectedRoute;
