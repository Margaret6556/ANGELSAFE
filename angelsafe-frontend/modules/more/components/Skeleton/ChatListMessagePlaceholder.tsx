import { View } from "react-native";
import React from "react";
import { makeStyles } from "@rneui/themed";
import {
  Fade,
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
} from "rn-placeholder";

const ChatListMessagePlaceholder = () => {
  const styles = useStyles();
  return (
    <Placeholder Animation={(props) => <Fade {...props} style={styles.fade} />}>
      <View style={styles.container}>
        <PlaceholderMedia isRound size={45} />
        <View style={styles.wrapper}>
          <PlaceholderLine width={100} />
          <PlaceholderLine width={60} />
        </View>
      </View>
    </Placeholder>
  );
};

export default ChatListMessagePlaceholder;

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: "row",
  },
  fade: {
    backgroundColor: theme.colors.grey4,
  },
  wrapper: {
    minWidth: "40%",
    marginLeft: theme.spacing.lg,
  },
}));
