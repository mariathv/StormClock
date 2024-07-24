import React, { createContext, useState, ReactNode } from "react";

// Define the shape of your location object
interface LocationData {
  latitude: number;
  longitude: number;
}

// Define the context type
interface AppContextType {
  location: LocationData | null;
  setLocation: React.Dispatch<React.SetStateAction<LocationData | null>>;
}

// Create a context object with initial values
export const UserContext = createContext<AppContextType>({
  location: null,
  setLocation: () => {},
});

// Provider component
interface GlobalProviderProps {
  children: ReactNode; // ReactNode allows any valid React child: JSX, strings, numbers, etc.
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [location, setLocation] = useState<LocationData | null>(null);

  return (
    <UserContext.Provider value={{ location, setLocation }}>
      {children}
    </UserContext.Provider>
  );
};
