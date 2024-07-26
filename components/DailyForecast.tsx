import React, { useState, useContext, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { UserContext } from "@/contexts/AppContext";
import { icons, weatherImages } from "@/constants/Images";
import { ScrollView } from "react-native";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { getDayOfWeek } from "@/utils/date_to_day";

const DailyForecast = () => {
  const { forecastData } = useContext(UserContext);
  const [weekData, setWeekData] = useState<any>({});

  const getWeekData = async () => {
    if (!forecastData) return;

    setWeekData(forecastData?.forecast.forecastday);
  };

  function toOneDecimal(num: number): string {
    return num.toFixed(1);
  }

  function getHumidityIcon(percen: number) {
    if (percen < 20) return icons["humidity_low" as keyof typeof icons];
    else if (percen >= 20 && percen < 70)
      return icons["humidity_med" as keyof typeof icons];
    else return icons["humidity_high" as keyof typeof icons];
  }

  useEffect(() => {
    getWeekData();
  }, [forecastData]);

  return (
    <View>
      <View className="m-3">
        <ScrollView
          contentContainerStyle={{ paddingVertical: 15 }}
          style={styles.containerStyle}
          className="rounded-2xl"
        >
          {weekData.length > 0 &&
            weekData.map((day: any, index: number) => {
              return (
                <View className="flex-row justify-between items-center px-1 py-3">
                  <Text className="color-white px-2 font-semibold">
                    {getDayOfWeek(day.date)}
                  </Text>
                  <View className="flex-row">
                    <View className="flex-row px-3">
                      <Image
                        source={getHumidityIcon(day.day.avghumidity)}
                        className="h-6 w-6 justify-center align-middle"
                      />
                      <Text className="color-white">
                        {day.day.avghumidity}%
                      </Text>
                    </View>
                    <View className="flex px-3">
                      <Image
                        source={
                          weatherImages[
                            day.day.condition.text as keyof typeof weatherImages
                          ] || weatherImages["Partly Cloudy"]
                        }
                        className="h-6 w-6"
                      />
                    </View>
                    <View className="flex px-3">
                      <Text className="color-white">
                        {toOneDecimal(day.day.avgtemp_c)}°C
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 10,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
});

export default DailyForecast;
