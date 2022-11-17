import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar, useTheme } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { moderateScale } from "react-native-size-matters";

interface AvatarChatProps {
  profilePicture: string;
  onPress?: () => void;
}

const AvatarChat = ({ profilePicture, onPress }: AvatarChatProps) => {
  const { theme } = useTheme();
  const handleOnPress = () => {
    onPress && onPress();
  };

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <Avatar
        source={{
          uri: profilePicture,
        }}
        containerStyle={{
          marginHorizontal: theme.spacing.sm,
        }}
        size={moderateScale(50)}
        rounded
      />
    </TouchableOpacity>
  );
};

export default AvatarChat;
