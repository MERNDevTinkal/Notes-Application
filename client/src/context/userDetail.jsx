import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { useLocation } from "react-router-dom"; // Import useLocation for route change

const UserDetailsContext = createContext();

export const UserDetailsProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  // Fetch user details function
  const fetchUserDetails = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get("/user/verify");

      if (res.data.success) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log("Error in user verification", error);
      setUser(null);
    } finally {
      setIsLoading(false); 
    }
  };

  const location = useLocation(); // Hook to track location changes

  useEffect(() => {
    fetchUserDetails(); // Run fetchUserDetails every time location changes
  }, [location.pathname]); // Dependency on pathname so it triggers on route change

  return (
    <UserDetailsContext.Provider value={{ user, setUser, fetchUserDetails, isLoading }}>
      {children}
    </UserDetailsContext.Provider>
  );
};

export const useUserDetails = () => useContext(UserDetailsContext);
