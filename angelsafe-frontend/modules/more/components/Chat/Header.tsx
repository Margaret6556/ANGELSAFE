import { StyleSheet, View } from "react-native";
import React from "react";
import { Avatar, Icon, Text, useTheme } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";

interface HeaderChatInterfaceProps {
  onBack: () => void;
}
const HeaderChatInterface = ({ onBack }: HeaderChatInterfaceProps) => {
  const { theme } = useTheme();
  const handleBack = () => {
    onBack();
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.5} onPress={handleBack}>
          <Icon type="ionicon" name="chevron-back" size={36} />
        </TouchableOpacity>
        <View style={styles.avatarContainer}>
          <Avatar
            source={{
              uri: "https://xsgames.co/randomusers/avatar.php?g=male",
            }}
            size={45}
            rounded
          />
        </View>
        <TouchableOpacity activeOpacity={0.5}>
          <Icon type="feather" name="more-horizontal" size={36} />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          color: theme.colors.grey0,
          fontSize: 14,
          textAlign: "center",
          marginTop: 4,
        }}
      >
        TEST USER
      </Text>
    </View>
  );
};

export default HeaderChatInterface;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderBottomColor: "#dedede",
    // borderBottomWidth: 1,
  },
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 8,
  },
  avatarContainer: {
    alignItems: "center",
  },
});
