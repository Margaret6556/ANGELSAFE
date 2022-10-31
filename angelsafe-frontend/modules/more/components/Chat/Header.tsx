import { StyleSheet, View } from "react-native";
import React from "react";
import { Avatar, Icon, makeStyles, Text, useTheme } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { UserType } from "@/shared/types";
import { RouteProp, useRoute } from "@react-navigation/native";

interface HeaderChatInterfaceProps {
  onBack: () => void;
}
const HeaderChatInterface = ({ onBack }: HeaderChatInterfaceProps) => {
  const { theme } = useTheme();
  const { params } = useRoute<RouteProp<{ receiver: UserType }>>();
  const handleBack = () => {
    onBack();
  };

  const styles = useStyles();
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.5} onPress={handleBack}>
          <Icon type="ionicon" name="chevron-back" size={36} />
        </TouchableOpacity>
        <View style={styles.avatarContainer}>
          <Avatar
            source={{
              uri: params.profilePic,
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
        {params.username}
      </Text>
    </View>
  );
};

export default HeaderChatInterface;

const useStyles = makeStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.colors.background,
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
}));
