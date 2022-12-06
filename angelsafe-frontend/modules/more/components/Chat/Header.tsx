import { StyleSheet, View } from "react-native";
import React from "react";
import { Avatar, Icon, makeStyles, Text, useTheme } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { UserType } from "@/shared/types";
import { RouteProp, useRoute } from "@react-navigation/native";
import { sizing } from "@/shared/providers/ThemeProvider";
import { moderateScale } from "react-native-size-matters";

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
          <Icon type="ionicon" name="chevron-back" size={moderateScale(36)} />
        </TouchableOpacity>
        <View style={styles.avatarContainer}>
          <Avatar
            source={{
              uri: params.profilePic,
            }}
            size={moderateScale(50)}
            rounded
          />
        </View>
        <View style={{ minWidth: moderateScale(36) }} />
        {/* <TouchableOpacity activeOpacity={0.5}>
          <Icon
            type="feather"
            name="more-horizontal"
            size={moderateScale(36)}
          />
        </TouchableOpacity> */}
      </View>
      <Text
        style={{
          color: theme.colors.grey0,
          fontSize: sizing.FONT.sm,
          textAlign: "center",
          marginTop: theme.spacing.xs,
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
    paddingVertical: theme.spacing.md,
    borderBottomColor: theme.colors.grey1,
  },
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: theme.spacing.md,
  },
  avatarContainer: {
    alignItems: "center",
  },
}));
