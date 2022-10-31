import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";

interface AvatarChatProps {
  profilePicture: string;
  onPress?: () => void;
}

const AvatarChat = ({ profilePicture, onPress }: AvatarChatProps) => {
  const handleOnPress = () => {
    onPress && onPress();
  };

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <Avatar
        source={{
          uri: profilePicture,
        }}
        size={45}
        containerStyle={{
          marginHorizontal: 10,
        }}
        avatarStyle={{}}
        rounded
      />
    </TouchableOpacity>
  );
};

export default AvatarChat;

const styles = StyleSheet.create({});
