import React from "react";
import Buttons from "./Buttons";
import { Container } from "@/shared/components";
import { MoodsType } from "@/home/types";
import { makeStyles, Text } from "@rneui/themed";
import { View } from "react-native";

interface IMoodsComponent {
  moods: MoodsType[];
}

const MoodsComponent = ({ moods }: IMoodsComponent) => {
  const styles = useStyles();
  return (
    <Container
      containerProps={{
        style: styles.container,
      }}
    >
      <View style={styles.textContainer}>
        <Text style={styles.subtitle}>How are you feeling today?</Text>
      </View>
      <View style={styles.wrapper}>
        {moods.map((mood) => (
          <Buttons key={mood.label} image={mood.image} label={mood.label} />
        ))}
      </View>
    </Container>
  );
};

export default MoodsComponent;

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: 0,
  },
  wrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContainer: {
    width: "100%",
    marginBottom: 24,
  },
  subtitle: {
    textAlign: "left",
    color: theme.colors.primary,
  },
}));
