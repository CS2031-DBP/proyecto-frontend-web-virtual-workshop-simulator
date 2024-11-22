import React, { useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider';


const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to= "/" />
}

export default ProtectedRoute
