import React, { useState, useContext, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { UserContext } from "@/contexts/AppContext";
import { icons } from "@/constants/Images";
const Weathernow = () => {
  const { weatherData, forecastData } = useContext(UserContext);

  return (
    <>
      <View
        className="flex-row justify-between items-center rounded-3xl py-3 m-4 px-5"
        style={styles.containerStyle}
      >
        <View className="flex-row space-x-1 items-center">
          <Image
            source={icons["wind" as keyof typeof icons]}
            className="h-5 w-5"
          />
          <Text className="color-white text-sm">
            {" "}
            {weatherData?.current?.wind_kph}{" "}
            <Text className="text-custom-xs">km/h</Text>
          </Text>
        </View>
        <View className="flex-row space-x-2 items-center">
          <Image
            source={icons["sun" as keyof typeof icons]}
            className="h-5 w-5"
          />
          <Text className="color-white text-sm">
            {forecastData?.forecast?.forecastday[0].astro.sunrise}
          </Text>
        </View>
        <View className="flex-row space-x-1 items-center">
          <Image
            source={icons["drop" as keyof typeof icons]}
            className="h-5 w-5"
          />
          <Text className="color-white text-sm">
            {" "}
            {weatherData?.current?.humidity}%
          </Text>
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
