import React from "react";
import {
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { Avatar, Text } from "@rneui/themed";
import randomNameGenerator from "@/shared/utils/randomNameGenerator";

interface IAvatarProps {
  source?: ImageSourcePropType;
  containerStyle?: StyleProp<ViewStyle>;
}

const AvatarComponent = (props: IAvatarProps) => {
  return (
    <View style={[styles.container, props.containerStyle]}>
      <Avatar
        size={64}
        rounded
        source={props.source}
        icon={{
          name: "person-circle-outline",
          type: "ionicon",
          color: "#fff",
          size: 56,
        }}
        containerStyle={{ backgroundColor: "blue" }}
      />
      <View style={styles.text}>
        <Text h4>{randomNameGenerator()}</Text>
        <Text>Member for 2 years</Text>
        <Text>He/Him</Text>
      </View>
    </View>
  );
};

export default AvatarComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 16,
  },
});
