import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";
import axios from "axios";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!isAuthenticated) {
        setUserDetails(null); // clear user details if not authenticated
        return;
      }

      try {
        const response = await axios.get("/api/user/profile");
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details in profile:", error);
      }
    };

    fetchUserDetails();
  }, [isAuthenticated]);

  return (
    <ProfileContext.Provider value={{ isAuthenticated, userDetails }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  return useContext(ProfileContext);
};
