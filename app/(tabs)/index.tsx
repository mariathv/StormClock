// HomeScreen.tsx

import React, { useContext } from "react";
import { Image, StyleSheet } from "react-native";
import { GlobalProvider, UserContext } from "@/contexts/AppContext";
import SelectCountryScreen from "@/components/CountryDropDown";
import LocationDisplay from "@/components/LocationDisplay";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { View } from "react-native";
import LocationScreen from "@/components/getLocation";
import CurrentWeather from "@/components/CurrentWeather";
import DisplayImage from "@/components/WeatherImage";
export default function HomeScreen() {
  const { location } = useContext(UserContext);
  console.log("loc", location);

  return (
    <GlobalProvider>
      <View className="relative pt-20">
        <Image
          source={require(`../../assets/images/main_bg.jpeg`)}
          style={styles.bg_format}
          blurRadius={10}
        />
        <LocationDisplay />
        <LocationScreen />
        <CurrentWeather />
        <DisplayImage />
      </View>
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  bg_format: {
    position: "absolute",
  },
  heading_1: {
    textAlign: "center",
  },
  flexContainer: {
    paddingTop: "20%",
    position: "relative",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
