import Cookies from "js-cookie";
import React, { createContext, useContext, useState } from "react";

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Helper to set authentication state
  const setAuthenticated = (value) => {
    setIsAuthenticated(value);
  };

  // Check if auth token exists
  const checkAuth = () => {
    const token = Cookies.get("authToken");
    console.log("Checking authentication...");

    if (token) {
      console.log("Token exists. Setting authenticated to true.");
      setAuthenticated(true);
    } else {
      console.log("Token does not exist. Setting authenticated to false.");
      setAuthenticated(false);
    }
  };

  // Logout function
  const logout = () => {
    Cookies.remove("authToken");
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setAuthenticated, checkAuth, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
