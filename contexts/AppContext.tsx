import React, { createContext, useState, ReactNode } from "react";

interface LocationData {
  latitude: number;
  longitude: number;
}

interface AppContextType {
  location: LocationData | null;
  setLocation: React.Dispatch<React.SetStateAction<LocationData | null>>;
  exactLocation: any;
  setExactLocation: React.Dispatch<React.SetStateAction<any>>;
}

export const UserContext = createContext<AppContextType>({
  location: null,
  setLocation: () => {},
  exactLocation: null,
  setExactLocation: () => {},
});

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [exactLocation, setExactLocation] = useState<any>();

  return (
    <UserContext.Provider
      value={{ location, setLocation, exactLocation, setExactLocation }}
    >
      {children}
    </UserContext.Provider>
  );
};
