import React, { useState, useContext, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { UserContext } from "@/contexts/AppContext";
import { icons } from "@/constants/Images";

const AstroDisp = () => {
  return (
    <>
      <View className="flex-row justify-between items-center rounded-3xl py-3 m-4 px-10">
        <View className="flex-row space-x-3 items-center">
          <Image
            source={icons["sunrise" as keyof typeof icons]}
            className="h-6 w-6"
          />
          <Text className="color-white text-base"> 22km</Text>
        </View>
        <View className="flex-row space-x-2 items-center">
          <Image
            source={icons["sunset" as keyof typeof icons]}
            className="h-6 w-6"
          />
          <Text className="color-white text-base"> 22km</Text>
        </View>
      </View>
    </>
  );
};

export default AstroDisp;
