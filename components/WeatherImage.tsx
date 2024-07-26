import React, { useState, useContext, useEffect } from "react";
import { Text, View, Image } from "react-native";
import { UserContext } from "@/contexts/AppContext";
import { weatherImages } from "@/constants/Images.js";

const DisplayImage = () => {
  const { weatherData } = useContext(UserContext);

  useEffect(() => {
    console.log(weatherData?.current?.condition?.text);
  }, [weatherData]);
  return (
    <>
      {weatherData ? (
        <>
          <View className="flex-row justify-center">
            <Image
              source={
                weatherImages[
                  weatherData?.current?.condition
                    ?.text as keyof typeof weatherImages
                ]
              }
              className="w-52 h-52"
            ></Image>
          </View>
          <View className="flex-row justify-center">
            <Text className="text-white font-bold">
              {weatherData?.current?.condition?.text}
            </Text>
          </View>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default DisplayImage;
