import React, { useState, useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { SelectCountry } from "react-native-element-dropdown";
import { ColorProperties } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import { UserContext } from "@/contexts/AppContext";
import { ThemedText } from "./ThemedText";

const DisplayImage = () => {
  const { weatherData } = useContext(UserContext);

  useEffect(() => {
    console.log(weatherData?.current?.condition?.text);
  }, [weatherData]);
  return (
    <>
      {weatherData ? (
        <Text className="text-white">
          {weatherData?.current?.condition?.text}
        </Text>
      ) : (
        <></>
      )}
    </>
  );
};

export default DisplayImage;
