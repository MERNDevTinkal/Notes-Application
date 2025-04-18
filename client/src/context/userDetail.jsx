import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";

const UserDetailsContext = createContext();

export const UserDetailsProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const res = await axiosInstance.get("/user/verify");

      if (res.data.success) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
        console.log("error in user verification", error);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUserDetails(); 
  }, []);

  return (
    <UserDetailsContext.Provider value={{ user, setUser, fetchUserDetails }}>
      {children}
    </UserDetailsContext.Provider>
  );
};

export const useUserDetails = () => useContext(UserDetailsContext);
