import { Text, View } from "react-native";
import React from "react";
import { Card, makeStyles } from "@rneui/themed";
import {
  Fade,
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
} from "rn-placeholder";
import { scale } from "react-native-size-matters";
import { sizing } from "@/shared/providers/ThemeProvider";

const PostCommentsPlaceholder = () => {
  const styles = useStyles();
  return (
    <Placeholder Animation={(props) => <Fade {...props} style={styles.fade} />}>
      <View>
        <View style={styles.wrapper}>
          <View style={{ width: "10%" }}>
            <PlaceholderMedia isRound size={scale(36)} />
          </View>
          <Card containerStyle={styles.cardContainer}>
            <PlaceholderLine height={scale(10)} width={30} />
            <View style={{ marginTop: scale(8) }}>
              <PlaceholderLine height={scale(8)} width={60} />
              <PlaceholderLine height={scale(8)} width={90} />
              <PlaceholderLine height={scale(8)} width={100} />
              <PlaceholderLine height={scale(8)} width={80} noMargin />
            </View>
          </Card>
        </View>
      </View>
    </Placeholder>
  );
};

export default PostCommentsPlaceholder;

const useStyles = makeStyles((theme) => ({
  wrapper: {
    flexDirection: "row",
    marginBottom: theme.spacing.lg,
  },
  fade: {
    backgroundColor: theme.colors.grey4,
  },
  cardContainer: {
    width: "88%",
    marginLeft: "2%",
    borderRadius: sizing.BORDER_RADIUS,
    margin: 0,
    borderColor: "transparent",
    padding: theme.spacing.md,
  },
}));
