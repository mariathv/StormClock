import { useState, useEffect } from "react";

export const useFetchWeatherCurrent = (exactLocation: any) => {
  const [weatherData, setWeatherData] = useState<any>();

  const getCurrentWeather = async () => {
    const geocode_url = `${process.env.EXPO_PUBLIC_API_WA}/v1/current.json?key=${process.env.EXPO_PUBLIC_API_KEY_WA}&q=${exactLocation.latitude},${exactLocation.longitude}&aqi=no`;

    const data = await fetch(geocode_url);
    if (!data.ok) {
      console.log(
        "failed to fetch geocode weather,",
        `${process.env.EXPO_PUBLIC_API_WA}/v1/current.json?key=${process.env.EXPO_PUBLIC_API_KEY_WA}&q=${exactLocation.latitude},${exactLocation.longitude}&aqi=no`
      );
    }

    const fetched = await data.json();
    setWeatherData(fetched);
  };

  useEffect(() => {
    getCurrentWeather();
  }, []);
  console.log("fetched weather data (current) ", weatherData);
  return { weatherData };
};
