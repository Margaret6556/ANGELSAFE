import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Fade, Placeholder, PlaceholderMedia } from "rn-placeholder";
import { makeStyles } from "@rneui/themed";

const ChatListAvatarPlaceholder = () => {
  const styles = useStyles();
  return (
    <Placeholder Animation={(props) => <Fade {...props} style={styles.fade} />}>
      <PlaceholderMedia isRound size={45} />
    </Placeholder>
  );
};

export default ChatListAvatarPlaceholder;

const useStyles = makeStyles((theme) => ({
  fade: { backgroundColor: theme.colors.grey4 },
}));
