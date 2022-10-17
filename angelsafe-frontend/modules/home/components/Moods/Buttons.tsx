import { StyleSheet, View, ImageSourcePropType } from "react-native";
import React from "react";
import { Text, Button, Image } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";

interface IMoodsButtons {
  label: string;
  image: ImageSourcePropType;
}

const MoodsButtons = ({ label, image }: IMoodsButtons) => {
  const handleOnPress = (val: string) => {
    console.log({ val });
  };

  return (
    <TouchableOpacity
      containerStyle={styles.buttonContainer}
      onPress={() => handleOnPress(label)}
      activeOpacity={0.6}
    >
      <View style={styles.container}>
        <Image
          source={image}
          style={styles.image}
          containerStyle={styles.imageContainer}
        />
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MoodsButtons;

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 0,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    height: 56,
    width: 56,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
});
