// HomeScreen.tsx

import React, { useContext } from "react";
import { Image, StyleSheet } from "react-native";
import { GlobalProvider, UserContext } from "@/contexts/AppContext";
import LocationDisplay from "@/components/LocationDisplay";

import { View, ScrollView } from "react-native";
import CurrentWeather from "@/components/CurrentWeather";
import DisplayImage from "@/components/WeatherImage";
import Weathernow from "@/components/WeatherNow";
import DailyForecast from "@/components/DailyForecast";
import HourlyForecast from "@/components/HourlyForecast";
import MainHomeScreen from "./homeScreen";

export default function HomeScreen() {
  return (
    <GlobalProvider>
      <MainHomeScreen />
    </GlobalProvider>
  );
}
