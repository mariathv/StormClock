import React, { useState, useContext, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { UserContext } from "@/contexts/AppContext";
import { icons, weatherImages } from "@/constants/Images";
import { ScrollView } from "react-native";
import { splitWord } from "@/utils/splitWord";
import { convert24To12Hour } from "@/utils/timeFormatConvert";

const HourlyForecast = () => {
  const { forecastData } = useContext(UserContext);
  const [HourlyData, setHourlyData] = useState<any>();
  const getHourlyData = async () => {
    if (!forecastData) return;

    setHourlyData(forecastData.forecast.forecastday[0].hour);
  };

  useEffect(() => {
    getHourlyData();
  }, [forecastData]);

  return (
    <View>
      <View className="flex-row items-center px-5">
        <Image
          source={icons["clock" as keyof typeof icons]}
          className="h-6 w-6"
        />
        <Text className="color-white px-2 font-semibold"> Hourly Forecast</Text>
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={true}
      >
        <View className="flex-row justify-between items-center px-1 py-3">
          {HourlyData &&
            HourlyData.map((hour: any, index: number) => {
              const typedHour = hour;
              return (
                <View
                  key={typedHour.time_epoch}
                  className="flex-col justify-center text-center items-center rounded-3xl p-3 mr-2"
                  style={styles.containerStyle}
                >
                  <Text className="text-gray-100 text-custom-xs">
                    {convert24To12Hour(splitWord(typedHour.time))}
                  </Text>
                  <Image
                    source={
                      weatherImages[
                        typedHour.condition.text as keyof typeof weatherImages
                      ] || weatherImages["Partly Cloudy"]
                    }
                    className="h-10 w-10"
                  />
                  <Text className="color-white"> {typedHour.temp_c}°C</Text>
                </View>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 10,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
});

export default HourlyForecast;
