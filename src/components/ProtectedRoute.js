// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token'); // Check if the token exists

  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
