import React, { useState, useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import { SelectCountry } from "react-native-element-dropdown";
import { ColorProperties } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import { UserContext } from "@/contexts/AppContext";
import { ThemedText } from "./ThemedText";
import { Text } from "react-native";

const local_data = [
  {
    value: "1",
    lable: "Country 1",
    image: {
      uri: "https://www.vigcenter.com/public/all/images/default-image.jpg",
    },
  },
  {
    value: "2",
    lable: "Country 2",
    image: {
      uri: "https://www.vigcenter.com/public/all/images/default-image.jpg",
    },
  },
  {
    value: "3",
    lable: "Country 3",
    image: {
      uri: "https://www.vigcenter.com/public/all/images/default-image.jpg",
    },
  },
  {
    value: "4",
    lable: "Country 4",
    image: {
      uri: "https://www.vigcenter.com/public/all/images/default-image.jpg",
    },
  },
  {
    value: "5",
    lable: "Country 5",
    image: {
      uri: "https://www.vigcenter.com/public/all/images/default-image.jpg",
    },
  },
];

const LocationDisplay = () => {
  const [country, setCountry] = useState("1");
  const [exactLoc, setexactLoc] = useState<any>();
  const { location, setExactLocation } = useContext(UserContext);

  //console.log("exact location: ", exactLoc);

  const getExactLocation = async () => {
    const longitude = location?.longitude;
    const latitude = location?.latitude;

    const api_bigdata = `${process.env.EXPO_PUBLIC_API_BD}/reverse-geocode?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&key=${process.env.EXPO_PUBLIC_API_KEY_BD}`;

    const data = await fetch(api_bigdata);

    if (!data.ok) {
      console.log("failed to fetch location");
      return;
    }

    const fetched = await data.json();
    setexactLoc(fetched);
    setExactLocation(fetched);
  };

  useEffect(() => {
    if (location) {
      getExactLocation();
    }
  }, [location]);

  return (
    <>
      <Text className="text-white text-center text-2xl font-bold pt-20">
        {exactLoc ? (
          <>
            {exactLoc.city},{" "}
            <Text className="text-lg font-semibold">
              {" "}
              {exactLoc.countryName}
            </Text>
          </>
        ) : (
          ""
        )}
      </Text>
    </>
  );
};

export default LocationDisplay;

const styles = StyleSheet.create({
  countryFont: {
    fontSize: 12,
  },
  heading_1: {
    textAlign: "center",
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
