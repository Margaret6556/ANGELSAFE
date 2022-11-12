import { View } from "react-native";
import React from "react";
import {
  Fade,
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
} from "rn-placeholder";
import { Card, Divider, makeStyles } from "@rneui/themed";

const MyPostsPlaceholder = () => {
  const styles = useStyles();
  return (
    <Placeholder Animation={(props) => <Fade {...props} style={styles.fade} />}>
      <Card containerStyle={styles.cardContainer}>
        <View style={{ flexDirection: "row" }}>
          <PlaceholderMedia isRound size={35} />
          <View style={{ minWidth: "40%", marginLeft: 8 }}>
            <PlaceholderLine height={8} width={100} />
            <PlaceholderLine height={8} width={60} />
          </View>
        </View>
        <Divider style={styles.divider} />
        <View>
          <PlaceholderLine width={60} />
          <PlaceholderLine width={100} />
          <PlaceholderLine width={80} />
        </View>
      </Card>
    </Placeholder>
  );
};

export default MyPostsPlaceholder;

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    backgroundColor: theme.colors.background,
    marginHorizontal: 0,
    borderRadius: 8,
    borderColor: "transparent",
  },
  fade: {
    backgroundColor: theme.colors.grey4,
  },
  divider: {
    marginVertical: 12,
  },
}));
