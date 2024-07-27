import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "@/contexts/AppContext";
import { Text } from "react-native";

const CurrentWeather = () => {
  const { weatherData } = useContext(UserContext);

  function displayTemperature() {
    if (!weatherData) return;
    return `${weatherData?.current?.temp_c}°C`;
  }

  return (
    <>
      <Text className="text-white text-center text-3xl text-bold">
        {weatherData ? displayTemperature() : ""}
      </Text>
    </>
  );
};

export default CurrentWeather;
