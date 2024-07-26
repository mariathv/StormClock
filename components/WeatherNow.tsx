import React, { useState, useContext, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { UserContext } from "@/contexts/AppContext";
import { icons } from "@/constants/Images";
const Weathernow = () => {
  const [forecast, setForecast] = useState<any>();
  const { exactLocation, setForecastData } = useContext(UserContext);

  const getForecast = async () => {
    const api_url = `${process.env.EXPO_PUBLIC_API_WA}/v1/forecast.json?key=${process.env.EXPO_PUBLIC_API_KEY_WA}&&q=${exactLocation.latitude},${exactLocation.longitude}&days=7&aqi=no&alerts=no`;

    console.log(
      `${process.env.EXPO_PUBLIC_API_WA}/v1/forecast.json?key=${process.env.EXPO_PUBLIC_API_KEY_WA}&&q=${exactLocation.latitude},${exactLocation.longitude}&days=7&aqi=no&alerts=no`
    );

    const data = await fetch(api_url);
    if (!data.ok) console.log("failed to fetch forecast data");
    const fetched = await data.json();
    setForecast(fetched);
    setForecastData(fetched);
  };

  useEffect(() => {
    getForecast();
  }, [exactLocation]);
  return (
    <>
      <View
        className="flex-row justify-between items-center rounded-3xl py-3 m-4 px-5"
        style={styles.containerStyle}
      >
        <View className="flex-row space-x-3 items-center">
          <Image
            source={icons["wind" as keyof typeof icons]}
            className="h-6 w-6"
          />
          <Text className="color-white text-base"> 22km</Text>
        </View>
        <View className="flex-row space-x-2 items-center">
          <Image
            source={icons["sun" as keyof typeof icons]}
            className="h-6 w-6"
          />
          <Text className="color-white text-base">6:05AM</Text>
        </View>
        <View className="flex-row space-x-2 items-center">
          <Image
            source={icons["drop" as keyof typeof icons]}
            className="h-6 w-6"
          />
          <Text className="color-white text-base"> 15%</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
});
export default Weathernow;
