import React, { createContext, useContext, useState } from "react";
import axiosInstance from "../axiosInstance";

const UserDetailsContext = createContext();

export const UserDetailsProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Fetch User Details from API
    const fetchUserDetails = async () => {
        try {
            const response = await axiosInstance.get("/user/me");
           // console.log("User details fetched:", response.data.user);

            setUser(response.data.user);

        } catch (error) {
            console.error("Error fetching user details", error);
        }
    };

    return (
        <UserDetailsContext.Provider value={{ user, fetchUserDetails }}>
            {children}
        </UserDetailsContext.Provider>
    );
};


export const useUserDetails = () => {

    return useContext(UserDetailsContext);
};
