import React, { useState, useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import { SelectCountry } from "react-native-element-dropdown";
import { ColorProperties } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import { UserContext } from "@/contexts/AppContext";
import { Text } from "react-native";

const CurrentWeather = () => {
  const { exactLocation, setWeatherData } = useContext(UserContext);
  const [currentWeather, setCurrentWeather] = useState<any>();

  const getCurrentWeather = async () => {
    const geocode_url = `${process.env.EXPO_PUBLIC_API_WA}/v1/current.json?key=${process.env.EXPO_PUBLIC_API_KEY_WA}&q=${exactLocation.latitude},${exactLocation.longitude}&aqi=no`;

    const data = await fetch(geocode_url);
    if (!data.ok) {
      console.log("failed to fetch geocode weather");
    }

    const fetched = await data.json();
    setCurrentWeather(fetched);
    setWeatherData(fetched);
    console.log(fetched);
  };

  useEffect(() => {
    getCurrentWeather();
  }, [exactLocation]);

  function displayTemperature() {
    if (!currentWeather) return;
    return `${currentWeather?.current?.temp_c}°C`;
  }

  return (
    <>
      <Text className="text-white text-center text-3xl text-bold">
        {currentWeather ? displayTemperature() : ""}
      </Text>
    </>
  );
};

export default CurrentWeather;

const styles = StyleSheet.create({
  heading_1: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 30,
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    backgroundColor: "white",
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  imageStyle: {
    width: 24,
    height: 24,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "white",
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
