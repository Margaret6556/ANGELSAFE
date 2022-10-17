import { StyleSheet, ImageSourcePropType } from "react-native";
import React from "react";
import Buttons from "./Buttons";
import { Container } from "@/shared/components";

interface IMoodsComponent {
  moods: { label: string; image: ImageSourcePropType }[];
}

const MoodsComponent = ({ moods }: IMoodsComponent) => {
  return (
    <Container
      containerProps={{
        style: styles.wrapper,
      }}
    >
      {moods.map((mood) => (
        <Buttons key={mood.label} image={mood.image} label={mood.label} />
      ))}
    </Container>
  );
};

export default MoodsComponent;

const styles = StyleSheet.create({
  wrapper: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
