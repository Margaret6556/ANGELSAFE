import { Animated, TouchableOpacity } from "react-native";
import React from "react";
import { Icon, useTheme } from "@rneui/themed";
import { scale } from "react-native-size-matters";

interface UpdateStatsButtonProps {
  animation: Animated.Value;
  onPress: () => void;
}

const UpdateStatsButton = (props: UpdateStatsButtonProps) => {
  const { theme } = useTheme();

  return (
    <Animated.View
      style={{
        position: "absolute",
        right: scale(20),
        bottom: scale(20),
        zIndex: 3,
        transform: [
          {
            scale: props.animation.interpolate({
              inputRange: [0, scale(50)],
              outputRange: [0, scale(1)],
            }),
          },
        ],
      }}
    >
      <TouchableOpacity onPress={props.onPress}>
        <Icon type="antdesign" name="pluscircle" color={theme.colors.primary} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default UpdateStatsButton;
