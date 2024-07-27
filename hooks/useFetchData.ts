import { useState, useEffect } from "react";
import { useGetPermissionLocation } from "./useGetPermissionLocation";
import * as Location from "expo-location";
import { Alert, Linking, BackHandler } from "react-native";
import CurrentWeather from "@/components/CurrentWeather";

interface LocationData {
  latitude: number;
  longitude: number;
}
export const useFetchData = () => {
  const { location, setLocation, permissionStatus, fetchingLocation } =
    useGetPermissionLocation();
  const [exactLocation, setExactLocation] = useState<any>();
  const [weatherData, setWeatherData] = useState<any>();
  const [forecastData, setForecastData] = useState<any>();

  const getExactLocation = async () => {
    const longitude = location?.longitude;
    const latitude = location?.latitude;

    const api_bigdata = `${process.env.EXPO_PUBLIC_API_BD}/reverse-geocode?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&key=${process.env.EXPO_PUBLIC_API_KEY_BD}`;

    const data = await fetch(api_bigdata);

    if (!data.ok) {
      console.log("failed to fetch location::", process.env.EXPO_PUBLIC_API_BD);
      return;
    }

    const fetched = await data.json();
    setExactLocation(fetched);
    console.log("Exact Location: ", fetched);
    getCurrentWeather(fetched);
  };

  const getCurrentWeather = async (loc: any) => {
    const geocode_url = `${process.env.EXPO_PUBLIC_API_WA}/v1/current.json?key=${process.env.EXPO_PUBLIC_API_KEY_WA}&q=${loc.latitude},${loc.longitude}&aqi=no`;
    console.log("fetching current weather", geocode_url);

    const data = await fetch(geocode_url);
    if (!data.ok) {
      console.log(
        "failed to fetch geocode weather,",
        `${process.env.EXPO_PUBLIC_API_WA}/v1/current.json?key=${process.env.EXPO_PUBLIC_API_KEY_WA}&q=${exactLocation.latitude},${exactLocation.longitude}&aqi=no`
      );
    }

    const fetched = await data.json();
    setWeatherData(fetched);
    console.log("Weather Data: ", fetched);
    getForecast(loc);
  };

  const getForecast = async (loc: any) => {
    const api_url = `${process.env.EXPO_PUBLIC_API_WA}/v1/forecast.json?key=${process.env.EXPO_PUBLIC_API_KEY_WA}&&q=${loc.latitude},${loc.longitude}&days=7&aqi=no&alerts=no`;

    const data = await fetch(api_url);
    if (!data.ok) console.log("failed to fetch forecast data");
    const fetched = await data.json();
    setForecastData(fetched);
    console.log("Weather Forecast: ", fetched);
  };

  useEffect(() => {
    if (permissionStatus === "denied" || permissionStatus === "blocked") {
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
            onPress: () => {
              BackHandler.exitApp();
            },
          },
        ]
      );
    }
  }, [location, permissionStatus, fetchingLocation]);

  useEffect(() => {
    getExactLocation();
  }, [location]);

  return { location, exactLocation, weatherData, forecastData };
};
