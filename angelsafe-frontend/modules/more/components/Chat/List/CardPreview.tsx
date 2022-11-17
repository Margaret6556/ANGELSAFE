import React from "react";
import { View } from "react-native";
import { ListItem, makeStyles, useTheme } from "@rneui/themed";
import { StyleConstants } from "@/shared/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar, Text } from "@rneui/themed";
import { ChatListResponse } from "@/shared/api/chat";
import useIsDark from "@/shared/hooks/useIsDark";
import { moderateScale } from "react-native-size-matters";
import { sizing } from "@/shared/providers/ThemeProvider";

interface ChatPreviewProps extends ChatListResponse {
  onPress: () => void;
}

const ChatPreview = (props: ChatPreviewProps) => {
  const isDark = useIsDark();
  const styles = useStyles({ isDark });
  const { theme } = useTheme();

  const handlePress = () => {
    props.onPress && props.onPress();
  };

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={handlePress}>
      <ListItem containerStyle={styles.container}>
        <ListItem.Content style={styles.content}>
          <View style={styles.textContainer}>
            <Avatar
              source={{
                uri: props.receiver.profilePic,
              }}
              containerStyle={{ marginRight: theme.spacing.md }}
              rounded
              size={moderateScale(50)}
            />
            <View style={{ justifyContent: "flex-end" }}>
              <Text style={styles.textPrimary}>{props.receiver.username}</Text>
              <Text style={styles.textSecondary}>
                {props.lastMessage.substring(0, 30)}
              </Text>
            </View>
          </View>
          <View style={styles.lastOnlineContainer}>
            <Text style={styles.lastOnlineText}>{"1 min ago"}</Text>
            {isDark}
          </View>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );
};

export default ChatPreview;

const useStyles = makeStyles((theme, props: { isDark: boolean }) => ({
  container: {
    minHeight: moderateScale(50),
    padding: 0,
    paddingVertical: theme.spacing.lg,
    backgroundColor: "transparent",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.lg,
  },
  checkbox: {
    marginRight: theme.spacing.lg,
  },
  title: {
    color: props.isDark ? theme.colors.grey0 : theme.colors.primary,
  },
  textContainer: {
    height: moderateScale(40),
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  textPrimary: {
    fontFamily: "nunitoMedium",
    fontSize: sizing.FONT.sm,
    color: theme.colors.primary,
  },
  textSecondary: {
    fontFamily: "nunitoLight",
    color: theme.colors.grey1,
  },
  lastOnlineContainer: {
    alignItems: "flex-end",
    height: moderateScale(40),
    justifyContent: "space-between",
  },
  lastOnlineText: {
    fontFamily: "nunitoLight",
    fontSize: sizing.FONT.xs,
    color: theme.colors.grey1,
  },
}));
