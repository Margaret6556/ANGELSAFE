import { StyleSheet, View } from "react-native";
import React from "react";
import { Card, Text } from "@rneui/themed";
import Avatar from "./Avatar";
import { StyleConstants } from "@/shared/styles";

type Props = {
  description: string;
};

const CardFeed = (props: Props) => {
  return (
    <Card
      containerStyle={styles.cardContainer}
      wrapperStyle={styles.cardWrapper}
    >
      <Avatar />
      <View style={styles.cardDescription}>
        <Text>{props.description}</Text>
      </View>
    </Card>
  );
};

export default CardFeed;

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 0,
    borderRadius: StyleConstants.PADDING_HORIZONTAL / 2,
  },
  cardWrapper: {},
  cardAvatar: {},
  cardDescription: {
    marginVertical: 24,
  },
});
