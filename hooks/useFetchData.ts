import { useState, useEffect } from "react";
import { useGetPermissionLocation } from "./useGetPermissionLocation";
import { Alert, Linking, BackHandler } from "react-native";

interface LocationData {
  latitude: number;
  longitude: number;
}

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

export const useFetchData = () => {
  const { location, setLocation, permissionStatus, fetchingLocation } =
    useGetPermissionLocation();
  const [error, setError] = useState<string>("");
  const [exactLocation, setExactLocation] = useState<any>();
  const [weatherData, setWeatherData] = useState<any>();
  const [forecastData, setForecastData] = useState<any>();

  const fetchWithRetries = async (
    url: string,
    maxRetries: number = MAX_RETRIES
  ) => {
    let attempts = 0;
    while (attempts < maxRetries) {
      try {
        const response = await fetch(url);
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
      } catch (error) {
        attempts++;
        if (attempts >= maxRetries) throw error;
        await new Promise((res) => setTimeout(res, RETRY_DELAY_MS)); // Wait before retrying
      }
    }
  };

  const getExactLocation = async () => {
    if (!location?.longitude || !location?.latitude) return;

    const api_bigdata = `${process.env.EXPO_PUBLIC_API_BD}/reverse-geocode?latitude=${location.latitude}&longitude=${location.longitude}&localityLanguage=en&key=${process.env.EXPO_PUBLIC_API_KEY_BD}`;

    setError("Fetching Exact Location...");

    try {
      const fetched = await fetchWithRetries(api_bigdata);
      setExactLocation(fetched);
      console.log("Exact Location: ", fetched);

      if (!weatherData) await getCurrentWeather(fetched);
      if (!forecastData) await getForecast(fetched);
    } catch (error) {
      setError("Failed to fetch exact location.");
      console.error(error);
    }
  };

  const getCurrentWeather = async (loc: any) => {
    const geocode_url = `${process.env.EXPO_PUBLIC_API_WA}/v1/current.json?key=${process.env.EXPO_PUBLIC_API_KEY_WA}&q=${loc.latitude},${loc.longitude}&aqi=no`;

    setError("Fetching Weather...");

    try {
      const fetched = await fetchWithRetries(geocode_url);
      setWeatherData(fetched);
      setError(`Weather data fetched: ${fetched.current.wind_kph}`);
    } catch (error: any) {
      const errorMessage = `Failed to fetch forecast data. Forecast Data: ${JSON.stringify(
        forecastData
      )} Error: ${error.message}`;
      setError("Failed to fetch weather data." + geocode_url + errorMessage);
      console.error(error);
    }
  };

  const getForecast = async (loc: any) => {
    const api_url = `${process.env.EXPO_PUBLIC_API_WA}/v1/forecast.json?key=${process.env.EXPO_PUBLIC_API_KEY_WA}&q=${loc.latitude},${loc.longitude}&days=7&aqi=no&alerts=no`;

    setError("Fetching Forecast...");

    try {
      const fetched = await fetchWithRetries(api_url);
      setForecastData(fetched);
    } catch (error: any) {
      const errorMessage = `Failed to fetch forecast data. Forecast Data: ${JSON.stringify(
        forecastData
      )} Error: ${error.message}`;
      setError("Failed to fetch forecast data." + api_url + errorMessage);
      console.error(error);
    }
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
  }, [permissionStatus]);

  useEffect(() => {
    const fetchData = async () => {
      if (location) await getExactLocation();
    };
    fetchData();
  }, [location]);

  return { location, exactLocation, weatherData, forecastData, error };
};
