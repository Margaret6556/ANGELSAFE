import { View } from "react-native";
import React from "react";
import {
  Placeholder,
  Fade,
  PlaceholderMedia,
  PlaceholderLine,
} from "rn-placeholder";
import { makeStyles } from "@rneui/themed";

const PostAvatarPlacholder = () => {
  const styles = useStyles();
  return (
    <Placeholder Animation={(props) => <Fade {...props} style={styles.fade} />}>
      <View style={{ flexDirection: "row" }}>
        <PlaceholderMedia isRound size={35} />
        <View style={{ minWidth: "40%", marginLeft: 12 }}>
          <PlaceholderLine height={8} width={100} />
          <PlaceholderLine height={8} width={70} />
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
