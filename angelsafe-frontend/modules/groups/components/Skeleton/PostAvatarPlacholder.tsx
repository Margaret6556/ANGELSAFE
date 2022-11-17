import { View } from "react-native";
import React from "react";
import {
  Placeholder,
  Fade,
  PlaceholderMedia,
  PlaceholderLine,
} from "rn-placeholder";
import { makeStyles, useTheme } from "@rneui/themed";
import { moderateScale, scale } from "react-native-size-matters";

const PostAvatarPlacholder = () => {
  const styles = useStyles();
  const { theme } = useTheme();
  return (
    <Placeholder Animation={(props) => <Fade {...props} style={styles.fade} />}>
      <View style={{ flexDirection: "row" }}>
        <PlaceholderMedia isRound size={moderateScale(36)} />
        <View style={{ minWidth: "40%", marginLeft: theme.spacing.md }}>
          <PlaceholderLine height={scale(8)} width={100} />
          <PlaceholderLine height={scale(8)} width={70} />
        </View>
      </View>
    </Placeholder>
  );
};

export default PostAvatarPlacholder;

const useStyles = makeStyles((theme) => ({
  fade: {
    backgroundColor: theme.colors.grey4,
  },
}));
