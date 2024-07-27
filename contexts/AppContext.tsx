import React, { createContext, useState, ReactNode, useEffect } from "react";
import { useFetchData } from "@/hooks/useFetchData";
import { Alert, BackHandler, Linking } from "react-native";

interface LocationData {
  latitude: number;
  longitude: number;
}

interface AppContextType {
  location: any;
  exactLocation: any;
  weatherData: any;
  forecastData: any;
}

export const UserContext = createContext<AppContextType>({
  location: null,
  exactLocation: null,
  weatherData: null,
  forecastData: null,
});

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const { location, exactLocation, weatherData, forecastData } = useFetchData();

  return (
    <UserContext.Provider
      value={{
        location,
        exactLocation,
        weatherData,
        forecastData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
