import React, { useState, useContext } from "react";
import { StyleSheet } from "react-native";
import { SelectCountry } from "react-native-element-dropdown";
import { ColorProperties } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import { UserContext } from "@/contexts/AppContext";
import { ThemedText } from "./ThemedText";

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

const SelectCountryScreen = () => {
  const [country, setCountry] = useState("1");
  const { location } = useContext(UserContext);
  console.log("location:", location);

  return (
    <>
      {/*
        <SelectCountry
          style={styles.dropdown}
          selectedTextStyle={styles.selectedTextStyle}
          placeholderStyle={styles.placeholderStyle}
          imageStyle={styles.imageStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          search
          maxHeight={200}
          value={country}
          data={local_data}
          valueField="value"
          labelField="lable"
          imageField="image"
          placeholder="Select country"
          searchPlaceholder="Search..."
          onChange={(e) => {
            setCountry(e.value);
          }}
        />
      */}
      <ThemedText type="subtitle" style={styles.heading_1}>
        {location
          ? `Location: ${location.latitude}, ${location.longitude}`
          : "Your Location is not set yet"}
      </ThemedText>
    </>
  );
};

export default SelectCountryScreen;

const styles = StyleSheet.create({
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
