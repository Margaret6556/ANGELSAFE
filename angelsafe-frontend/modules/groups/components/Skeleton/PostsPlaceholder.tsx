import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card } from "@rneui/base";
import {
  PlaceholderMedia,
  PlaceholderLine,
  Placeholder,
  Fade,
} from "rn-placeholder";
import { makeStyles } from "@rneui/themed";

const PostsPlaceholder = () => {
  const styles = useStyles();
  return (
    <Placeholder
      Animation={(props) => <Fade {...props} style={styles.fade} />}
      style={styles.container}
    >
      <View style={{ marginVertical: 24 }}>
        <PlaceholderLine height={50} noMargin />
      </View>
      {new Array(2).fill(0).map((_, idx) => (
        <Card
          key={idx}
          containerStyle={{
            borderRadius: 8,
            marginHorizontal: 0,
            marginTop: 0,
            marginBottom: 24,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              marginBottom: 24,
            }}
          >
            <PlaceholderMedia isRound size={35} />
            <View style={{ minWidth: "40%", marginLeft: 8 }}>
              <PlaceholderLine width={100} height={10} />
              <PlaceholderLine width={60} height={10} />
            </View>
          </View>
          <PlaceholderLine width={80} />
          <PlaceholderLine width={100} />
          <PlaceholderLine width={70} />
        </Card>
      ))}
    </Placeholder>
  );
};

export default PostsPlaceholder;

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 12,
  },
  fade: {
    backgroundColor: theme.colors.grey4,
  },
}));
