import { Text, View } from "react-native";
import React from "react";
import { Card, makeStyles } from "@rneui/themed";
import {
  Fade,
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
} from "rn-placeholder";

const PostCommentsPlaceholder = () => {
  const styles = useStyles();
  return (
    <Placeholder Animation={(props) => <Fade {...props} style={styles.fade} />}>
      <View>
        <View style={styles.wrapper}>
          <View style={{ width: "10%" }}>
            <PlaceholderMedia isRound size={35} />
          </View>
          <Card containerStyle={styles.cardContainer}>
            <PlaceholderLine height={8} width={30} />
            <View style={{ marginTop: 8 }}>
              <PlaceholderLine width={60} />
              <PlaceholderLine width={90} />
              <PlaceholderLine width={100} />
              <PlaceholderLine width={80} noMargin />
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
    marginBottom: 24,
  },
  fade: {
    backgroundColor: theme.colors.grey4,
  },
  cardContainer: {
    width: "88%",
    marginLeft: "2%",
    borderRadius: 8,
    margin: 0,
    borderColor: "transparent",
    padding: 8,
  },
}));
