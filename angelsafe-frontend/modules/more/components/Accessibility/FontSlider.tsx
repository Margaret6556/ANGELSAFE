import React from "react";
import { Slider, Text, useTheme, makeStyles } from "@rneui/themed";
import { View } from "react-native";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { setThemeFontSize } from "@/shared/state/reducers/theme";

const FontSlider = () => {
  const { theme } = useTheme();
  const { fontSizeMultiplier } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const styles = useStyles();

  return (
    <View>
      <Text style={styles.title}>Font Size</Text>
      <View style={styles.container}>
        <Text style={[styles.label, { fontSize: 14 }]}>A</Text>
        <Slider
          maximumValue={4}
          minimumValue={0}
          onValueChange={(value) => {
            dispatch(setThemeFontSize(value));
          }}
          orientation="horizontal"
          step={1}
          style={{ width: "80%" }}
          thumbStyle={{ height: 20, width: 20 }}
          thumbTintColor={theme.colors.secondary}
          thumbTouchSize={{ width: 40, height: 40 }}
          trackStyle={{ height: 8, borderRadius: 20 }}
          value={fontSizeMultiplier}
        />
        <Text style={[styles.label, { fontSize: 28 }]}>A</Text>
      </View>
    </View>
  );
};

export default FontSlider;

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: theme.colors.primary,
    fontFamily: "nunitoBold",
  },
  label: {
    width: "10%",
    textAlign: "center",
    fontFamily: "nunitoBold",
  },
}));
