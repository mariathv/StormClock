// HomeScreen.tsx

import React, { useContext } from "react";
import { Image, StyleSheet } from "react-native";
import { GlobalProvider, UserContext } from "@/contexts/AppContext";
import SelectCountryScreen from "@/components/CountryDropDown";
import LocationDisplay from "@/components/LocationDisplay";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import LocationScreen from "@/components/getLocation";
import CurrentWeather from "@/components/CurrentWeather";

export default function HomeScreen() {
  const { location } = useContext(UserContext);
  console.log("loc", location);

  return (
    <GlobalProvider>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={
          <Image
            source={require("@/assets/images/partial-react-logo.png")}
            style={styles.reactLogo}
          />
        }
      >
        <ThemedView style={styles.stepContainer}>
          <LocationDisplay />
          <LocationScreen />
          <CurrentWeather />
        </ThemedView>
      </ParallaxScrollView>
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  heading_1: {
    textAlign: "center",
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
