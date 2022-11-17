import { Dimensions, View } from "react-native";
import React from "react";
import {
  Fade,
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
} from "rn-placeholder";
import { makeStyles } from "@rneui/themed";
import { scale } from "react-native-size-matters";

const GroupListPlaceholder = () => {
  const styles = useStyles();
  const isTablet = Dimensions.get("window").width > 500;

  return (
    <Placeholder
      Animation={(props) => {
        return <Fade {...props} style={styles.fade} />;
      }}
      style={styles.container}
    >
      {new Array(4).fill(0).map((_, idx) => (
        <View key={idx} style={styles.wrapper}>
          {new Array(isTablet ? 4 : 3).fill(0).map((_, iidx) => (
            <View key={iidx}>
              <PlaceholderMedia isRound size={scale(64)} style={styles.media} />
              <PlaceholderLine height={scale(16)} />
            </View>
          ))}
        </View>
      ))}
    </Placeholder>
  );
};

export default GroupListPlaceholder;

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    padding: theme.spacing.lg,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  media: {
    marginBottom: theme.spacing.md,
  },
  fade: {
    backgroundColor: theme.colors.grey4,
  },
}));
