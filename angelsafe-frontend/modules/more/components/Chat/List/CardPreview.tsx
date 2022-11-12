import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Icon, ListItem, makeStyles, useTheme } from "@rneui/themed";
import { StyleConstants } from "@/shared/styles";
// import { IMoreData } from "@/more/types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar, Text } from "@rneui/themed";
import { color } from "@rneui/base";
import { UserType } from "@/shared/types";
import { ChatListResponse } from "@/shared/api/chat";
import useDarkMode from "@/shared/hooks/useDarkMode";

interface ChatPreviewProps extends ChatListResponse {
  onPress: () => void;
}

const ChatPreview = (props: ChatPreviewProps) => {
  const isDark = useDarkMode();
  const styles = useStyles({ isDark });

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
              containerStyle={{ marginRight: 12 }}
              size={45}
              rounded
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
    minHeight: 50,
    padding: 0,
    paddingVertical: 16,
    backgroundColor: "transparent",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: StyleConstants.PADDING_HORIZONTAL,
  },
  checkbox: {
    marginRight: StyleConstants.PADDING_HORIZONTAL,
  },
  title: {
    color: props.isDark ? theme.colors.grey0 : theme.colors.primary,
  },
  textContainer: {
    height: 40,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  textPrimary: {
    fontFamily: "nunitoMedium",
    fontSize: 18,
    color: theme.colors.primary,
  },
  textSecondary: {
    fontFamily: "nunitoLight",
    color: theme.colors.grey1,
  },
  lastOnlineContainer: {
    //   alignSelf: "flex-start",
    alignItems: "flex-end",
    height: 40,
    justifyContent: "space-between",
  },
  lastOnlineText: {
    fontFamily: "nunitoLight",
    fontSize: 10,
    color: theme.colors.grey1,
  },
}));
