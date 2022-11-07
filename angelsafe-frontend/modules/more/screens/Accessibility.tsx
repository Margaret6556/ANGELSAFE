import React from "react";
import { View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { MoreParamsList } from "../types";
import { Container } from "@/shared/components";
import { makeStyles } from "@rneui/themed";
import FontSlider from "../components/Accessibility/FontSlider";
import BackgroundImageTheme from "../components/Accessibility/BackgroundImageTheme";

const Accessibility = ({}: StackScreenProps<
  MoreParamsList,
  "Accessibility"
>) => {
  const styles = useStyles();

  return (
    <Container
      containerProps={{
        style: styles.container,
      }}
    >
      <BackgroundImageTheme />
      <FontSlider />
    </Container>
  );
};

export default Accessibility;

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
}));
