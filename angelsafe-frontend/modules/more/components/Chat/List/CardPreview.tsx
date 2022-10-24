import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Icon, ListItem, useTheme } from "@rneui/themed";
import { StyleConstants } from "@/shared/styles";
import { IMoreData } from "@/more/types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar, Text } from "@rneui/themed";
import { color } from "@rneui/base";

const ChatPreview = ({ label, onPress }: IMoreData) => {
  const { theme } = useTheme();
  const handlePress = () => {
    onPress && onPress();
  };

  const styles = makeStyles(theme.colors);

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={handlePress}>
      <ListItem containerStyle={styles.container}>
        <ListItem.Content style={styles.content}>
          <Avatar
            source={{
              uri: "https://xsgames.co/randomusers/avatar.php?g=male",
            }}
            size={45}
            rounded
          />
          <View style={styles.textContainer}>
            <Text style={styles.textPrimary}>{"TEST USER"}</Text>
            <Text style={styles.textSecondary}>
              {"I'm doing well thanks.WBU?".substring(0, 30)}
            </Text>
          </View>
          <View style={styles.lastOnlineContainer}>
            <Text style={styles.lastOnlineText}>{"1 min ago"}</Text>
            <Icon
              type="material-community"
              name="message-alert"
              color={theme.colors.primary}
              size={22}
            />
          </View>
          {/* <ListItem.Chevron /> */}
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );
};

export default ChatPreview;

const makeStyles = (color: { [key: string]: any }) =>
  StyleSheet.create({
    container: {
      minHeight: 50,
      padding: 0,
      paddingVertical: 16,
      backgroundColor: "transparent",
    },
    content: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
    },
    checkbox: {
      marginRight: StyleConstants.PADDING_HORIZONTAL,
    },
    title: {
      color: "#333",
    },
    textContainer: {
      height: 40,
      justifyContent: "center",
    },
    textPrimary: {
      fontFamily: "nunitoMedium",
      fontSize: 18,
      color: color.primary,
    },
    textSecondary: {
      fontFamily: "nunitoLight",
      color: color.grey0,
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
      color: color.grey0,
    },
  });
