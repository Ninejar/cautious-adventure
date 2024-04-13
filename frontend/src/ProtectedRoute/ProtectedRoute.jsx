import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const getUserRole = () => {
  // Get token from local storage
  const token = localStorage.getItem("auth-token");
  if (token) {
    try {
      // Decode token to get user role
      const decoded = jwtDecode(token);
      console.log("Decoded token:", decoded);
      return decoded.role;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }
  return null;
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  // Store the current user role
  const userRole = getUserRole();

  if (!userRole) {
    // User is not authenticated, or token could not be decoded
    return <Navigate to="/login" replace />;
  }
  // Checks if the user role is defined in the parameter + that role coorelates
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // User does not have permission to view this route
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authenticated and has the right role, render the child component(s)
  return children;
};

export default ProtectedRoute;
