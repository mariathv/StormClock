import React, { useContext, useEffect, useState } from "react";
import DotLoader from "./DotLoader";
import { View, Image, Text } from "react-native";

export default function Splash() {
  return (
    <>
      <View className="flex-1 relative">
        <Image
          source={require(`../assets/images/bg1.jpg`)}
          className="absolute h-full w-full"
          blurRadius={50}
        />

        <View className="relative flex-1 justify-center items-center mt-28">
          <Image
            source={require("../assets/images/logos/main.png")}
            className="absolute w-56 h-40"
          />
        </View>
        <View className="flex-1">
          <DotLoader />
        </View>
      </View>
    </>
  );
}
