import { StyleSheet, ImageSourcePropType } from "react-native";
import React, { useState } from "react";
import Buttons from "./Buttons";
import { Container } from "@/shared/components";
import { MoodsType } from "@/home/types";

interface IMoodsComponent {
  moods: MoodsType[];
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
