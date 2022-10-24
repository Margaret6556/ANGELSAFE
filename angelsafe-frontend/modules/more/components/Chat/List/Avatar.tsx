import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";

interface AvatarChatProps {
  uri?: string;
  onPress?: () => void;
}

const AvatarChat = ({
  uri = "https://xsgames.co/randomusers/avatar.php?g=male",
  onPress,
}: AvatarChatProps) => {
  const handleOnPress = () => {
    onPress && onPress();
  };

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <Avatar
        source={{
          uri,
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
