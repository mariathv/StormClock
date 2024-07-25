import React, { useContext, useEffect } from "react";
import { View, Text } from "react-native";
import * as Location from "expo-location";
import { UserContext } from "@/contexts/AppContext";

const LocationScreen: React.FC = () => {
  const { location, setLocation } = useContext(UserContext);

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant permission Location");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;
      setLocation({ latitude, longitude });
      console.log("Location: ", currentLocation);
    };
    getPermissions();
  }, []);

  return (
    <View
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    ></View>
  );
};

export default LocationScreen;
