// app/clientLayout.js
"use client"; // Ensure this is marked as a Client Component

import React, { useEffect, useContext } from "react";
import { UserLocationContext } from "../context/UserLocationContext"; // Import context

const ClientLayout = () => {
  const { setUserLocation } = useContext(UserLocationContext); // Get the setter from context

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        console.log("User's location:", pos);
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      function (error) {
        console.error("Error getting location:", error);
      }
    );
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return null; // This component doesn't render anything
};

export default ClientLayout;