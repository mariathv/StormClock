// src/hooks/useGetPermissionLocation.ts
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { Alert, Linking, BackHandler } from "react-native";

interface LocationData {
  latitude: number;
  longitude: number;
}

export const useGetPermissionLocation = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<string | null>(null);
  const [fetchingLocation, setFetchingLocation] = useState<boolean>(false); // Add fetching state

  const getPermissions = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionStatus(status);

      if (status !== "granted") {
        Alert.alert(
          "Location Permission Required",
          "Please grant location permission to access location data.",
          [
            {
              text: "Open Settings",
              onPress: () => Linking.openSettings(),
            },
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => BackHandler.exitApp(),
            },
          ]
        );
        return;
      }

      setFetchingLocation(true); // Start fetching
      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const { latitude, longitude } = coords;
      setLocation({ latitude, longitude });
      setFetchingLocation(false);
    } catch (error) {
      console.error("Failed to fetch location", error);
      setFetchingLocation(false);
      Alert.alert("Error", "Unable to fetch location.");
    }
  };

  useEffect(() => {
    getPermissions();
  }, []);

  return { location, setLocation, permissionStatus, fetchingLocation };
};
