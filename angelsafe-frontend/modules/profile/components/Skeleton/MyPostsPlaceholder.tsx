import { View } from "react-native";
import React from "react";
import {
  Fade,
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
} from "rn-placeholder";
import { Card, Divider, makeStyles } from "@rneui/themed";
import { scale } from "react-native-size-matters";
import { sizing } from "@/shared/providers/ThemeProvider";

const MyPostsPlaceholder = () => {
  const styles = useStyles();
  return (
    <Placeholder Animation={(props) => <Fade {...props} style={styles.fade} />}>
      <Card containerStyle={styles.cardContainer}>
        <View style={{ flexDirection: "row" }}>
          <PlaceholderMedia isRound size={scale(32)} />
          <View style={styles.wrapper}>
            <PlaceholderLine height={scale(8)} width={100} />
            <PlaceholderLine height={scale(8)} width={60} />
          </View>
        </View>
        <Divider style={styles.divider} />
        <View>
          <PlaceholderLine height={scale(8)} width={60} />
          <PlaceholderLine height={scale(8)} width={100} />
          <PlaceholderLine height={scale(8)} width={80} />
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
    borderRadius: sizing.BORDER_RADIUS,
    borderColor: "transparent",
  },
  wrapper: { minWidth: "40%", marginLeft: theme.spacing.md },
  fade: {
    backgroundColor: theme.colors.grey4,
  },
  divider: {
    marginVertical: theme.spacing.md,
  },
}));
