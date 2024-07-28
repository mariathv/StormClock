import React, { useContext, useEffect, useState } from "react";
import LocationDisplay from "@/components/LocationDisplay";
import CurrentWeather from "@/components/CurrentWeather";
import DisplayImage from "@/components/WeatherImage";
import Weathernow from "@/components/WeatherNow";
import DailyForecast from "@/components/DailyForecast";
import HourlyForecast from "@/components/HourlyForecast";
import { UserContext } from "@/contexts/AppContext";
import Splash from "@/components/SplashScreen";
import { View, ScrollView, Image, Text } from "react-native";

export default function MainHomeScreen() {
  const { location, exactLocation, weatherData, forecastData, error } =
    useContext(UserContext);

  const [allFetched, setallFetched] = useState(false);

  useEffect(() => {
    if (location && exactLocation && weatherData && forecastData) {
      setallFetched(true);
    }
  }, [location, exactLocation, weatherData, forecastData]);
  return (
    <>
      {allFetched ? (
        <>
          <ScrollView>
            <View className="flex-1 relative">
              <Image
                source={require(`../assets/images/bg1.jpg`)}
                className="absolute h-full w-full"
                blurRadius={50}
              />
              <LocationDisplay />
              <CurrentWeather />
              <DisplayImage />
              <Weathernow />
              <HourlyForecast />
              <DailyForecast />
            </View>
          </ScrollView>
        </>
      ) : (
        <>
          <Splash />
        </>
      )}
    </>
  );
}
