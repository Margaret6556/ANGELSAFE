import React from "react";
import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";
import { makeStyles } from "@rneui/themed";

interface LinearGradientBackgroundProps extends Partial<LinearGradientProps> {}

const LinearGradientBackground = (props: LinearGradientBackgroundProps) => {
  const styles = useStyles();
  return (
    <LinearGradient
      {...props}
      colors={[
        "#E7DEFC",
        "#E7DDFC",
        "#EBE5FD",
        "#E9E3FC",
        "#EFF2FD",
        "#DFEEF8",
        "#ECF7FC",
        "#D7EEF3",
        "#EAF7FB",
      ]}
      style={styles.container}
    >
      {props.children}
    </LinearGradient>
  );
};

export default LinearGradientBackground;

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    zIndex: 2,
  },
}));
