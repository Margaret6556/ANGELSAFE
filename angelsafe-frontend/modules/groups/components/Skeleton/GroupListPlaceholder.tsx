import { View } from "react-native";
import React from "react";
import {
  Fade,
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
} from "rn-placeholder";
import { makeStyles } from "@rneui/themed";

const GroupListPlaceholder = () => {
  const styles = useStyles();

  return (
    <Placeholder
      Animation={(props) => {
        return <Fade {...props} style={styles.fade} />;
      }}
      style={styles.container}
    >
      {new Array(4).fill(0).map((_, idx) => (
        <View key={idx} style={styles.wrapper}>
          <View>
            <PlaceholderMedia isRound size={76} style={styles.media} />
            <PlaceholderLine height={16} />
          </View>
          <View>
            <PlaceholderMedia isRound size={76} style={styles.media} />
            <PlaceholderLine height={16} />
          </View>
          <View>
            <PlaceholderMedia isRound size={76} style={styles.media} />
            <PlaceholderLine height={16} />
          </View>
        </View>
      ))}
    </Placeholder>
  );
};

export default GroupListPlaceholder;

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    padding: 24,
    paddingHorizontal: 32,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  media: {
    marginBottom: 8,
  },
  fade: {
    backgroundColor: theme.colors.grey4,
  },
}));
