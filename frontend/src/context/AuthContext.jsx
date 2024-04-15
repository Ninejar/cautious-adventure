import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

// Create a context to store the user role
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Store the user role in the state
  const [authState, setAuthState] = useState({
    userRole: "",
  });

  useEffect(() => {
    // Store token
    const token = localStorage.getItem("auth-token");
    if (token) {
      try {
        // Decode token to get user role
        const decoded = jwtDecode(token);
        // Update the user role in the state
        setAuthState({ userRole: decoded.role });
      } catch (error) {
        console.error("Error decoding token:", error);
        setAuthState({ userRole: "" });
      }
    } else {
      setAuthState({ userRole: "" });
    }
  }, []);

  const navigate = useNavigate();

  // Logout function
  const logout = () => {
    localStorage.removeItem("auth-token");
    setAuthState({ userRole: "" });
    navigate("/login");
  };

  // Login function
  const login = (token) => {
    // Store the response token in local storage
    localStorage.setItem("auth-token", token);
    const decoded = jwtDecode(token);
    setAuthState({ userRole: decoded.role });
  };

  return (
    // Provide the user role and the login/logout functions to the children
    <AuthContext.Provider
      value={{ userRole: authState.userRole, logout, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};
