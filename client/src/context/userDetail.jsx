import React, { createContext, useContext, useState, useEffect } from "react";
import { useLoader } from "./LoaderContext";
import axiosInstance from "../axiosInstance";

const UserDetailsContext = createContext();

export const UserDetailsProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const { setLoading } = useLoader();

  const fetchUserDetails = async () => {
    setLoading(true);
    try {
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
      setLoading(false);
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
