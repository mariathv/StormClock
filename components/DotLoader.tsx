import React from "react";
import { View, StyleSheet, Animated } from "react-native";

const DotLoader = () => {
  const animation = new Animated.Value(0);

  Animated.loop(
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ])
  ).start();

  const dotStyle = {
    opacity: animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.5, 1, 0.5],
    }),
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.7, 1],
        }),
      },
    ],
  };

  return (
    <View className="flex-row justify-center items-center space-x-2">
      <Animated.View
        style={[styles.dot, dotStyle]}
        className="bg-green-800 rounded-full w-4 h-4"
      />
      <Animated.View
        style={[styles.dot, dotStyle]}
        className="bg-green-950 rounded-full w-4 h-4"
      />
      <Animated.View
        style={[styles.dot, dotStyle]}
        className="bg-green-900 rounded-full w-4 h-4"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    width: 16,
    height: 16,
  },
});

export default DotLoader;
