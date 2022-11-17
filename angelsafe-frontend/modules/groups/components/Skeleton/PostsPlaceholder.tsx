import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card } from "@rneui/base";
import {
  PlaceholderMedia,
  PlaceholderLine,
  Placeholder,
  Fade,
} from "rn-placeholder";
import { makeStyles, useTheme } from "@rneui/themed";
import { moderateScale, scale } from "react-native-size-matters";
import { sizing } from "@/shared/providers/ThemeProvider";

const PostsPlaceholder = () => {
  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <Placeholder
      Animation={(props) => <Fade {...props} style={styles.fade} />}
      style={styles.container}
    >
      <View style={{ marginVertical: theme.spacing.lg }}>
        <PlaceholderLine height={moderateScale(50)} noMargin />
      </View>
      {new Array(2).fill(0).map((_, idx) => (
        <Card
          key={idx}
          containerStyle={{
            borderRadius: sizing.BORDER_RADIUS,
            marginHorizontal: 0,
            marginTop: 0,
            marginBottom: theme.spacing.lg,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              marginBottom: theme.spacing.lg,
            }}
          >
            <PlaceholderMedia isRound size={moderateScale(36)} />
            <View style={{ minWidth: "40%", marginLeft: theme.spacing.sm }}>
              <PlaceholderLine width={100} height={scale(8)} />
              <PlaceholderLine width={60} height={scale(8)} />
            </View>
          </View>
          <PlaceholderLine height={scale(8)} width={80} />
          <PlaceholderLine height={scale(8)} width={100} />
          <PlaceholderLine height={scale(8)} width={70} />
        </Card>
      ))}
    </Placeholder>
  );
};

export default PostsPlaceholder;

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing.lg,
  },
  fade: {
    backgroundColor: theme.colors.grey4,
  },
}));
