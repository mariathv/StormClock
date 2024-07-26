// HomeScreen.tsx

import React, { useContext } from "react";
import { Image, StyleSheet } from "react-native";
import { GlobalProvider, UserContext } from "@/contexts/AppContext";
import LocationDisplay from "@/components/LocationDisplay";

import { View, ScrollView } from "react-native";
import LocationScreen from "@/components/getLocation";
import CurrentWeather from "@/components/CurrentWeather";
import DisplayImage from "@/components/WeatherImage";
import Weathernow from "@/components/WeatherNow";
import AstroDisp from "@/components/AstroDisplay";
import DailyForecast from "@/components/DailyForecast";
import HourlyForecast from "@/components/HourlyForecast";

export default function HomeScreen() {
  const { location } = useContext(UserContext);
  console.log("loc", location);

  return (
    <GlobalProvider>
      <ScrollView>
        <View className="flex-1 relative">
          <Image
            source={require(`../assets/images/bg1.jpg`)}
            className="absolute h-full w-full"
            blurRadius={50}
          />
          <View>
            <LocationDisplay />
            <LocationScreen />
            <CurrentWeather />
            <DisplayImage />
            <Weathernow />
            <HourlyForecast />
            <DailyForecast />
          </View>
        </View>
      </ScrollView>
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
