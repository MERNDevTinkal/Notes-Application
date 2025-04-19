import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { useLocation } from "react-router-dom";

const UserDetailsContext = createContext();

export const UserDetailsProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation(); 

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

  useEffect(() => {
    fetchUserDetails(); 
  }, [location.pathname]);

  return (
    <UserDetailsContext.Provider
      value={{ user, setUser, fetchUserDetails, isLoading }}
    >
      {children}
    </UserDetailsContext.Provider>
  );
};

export const useUserDetails = () => useContext(UserDetailsContext);
