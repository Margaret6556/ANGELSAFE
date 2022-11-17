import { StyleSheet, View, ImageSourcePropType } from "react-native";
import React, { useCallback } from "react";
import { Text, Image, makeStyles, useTheme } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { Moods, setMood } from "@/shared/state/reducers/experience";
import { MoodsType } from "@/home/types";
import { moderateScale } from "react-native-size-matters";

const MoodsButtons = ({ label, image }: Omit<MoodsType, "id">) => {
  const dispatch = useAppDispatch();
  const { mood } = useAppSelector((state) => state.experience);
  const { theme } = useTheme();

  const styles = useStyles({
    isSelected: typeof mood === "undefined" ? undefined : mood === label,
  });

  const handleOnPress = useCallback(
    (val: Moods) => () => {
      dispatch(setMood(val));
    },
    []
  );

  return (
    <TouchableOpacity
      containerStyle={styles.buttonContainer}
      onPress={handleOnPress(label)}
      activeOpacity={0.6}
    >
      <View style={styles.container}>
        <Image
          source={image}
          style={[
            styles.image,
            mood === label
              ? {
                  borderColor: theme.colors.primary,
                  borderWidth: moderateScale(2, 0.25),
                  borderRadius: theme.spacing.md,
                }
              : {},
          ]}
          containerStyle={styles.imageContainer}
        />
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MoodsButtons;

const useStyles = makeStyles(
  (
    theme,
    props: {
      isSelected: boolean | undefined;
    }
  ) => ({
    buttonContainer: {
      padding: 0,
      opacity:
        typeof props.isSelected === "undefined" || props.isSelected ? 1 : 0.4,
    },
    container: {
      justifyContent: "center",
      alignItems: "center",
    },
    imageContainer: {
      height: moderateScale(56, 0.7),
      width: moderateScale(56, 0.7),
    },
    image: {
      width: "100%",
      height: "100%",
    },
    label: {
      fontSize: moderateScale(14, 0.25),
      marginTop: moderateScale(4, 1),
      color: !!!props.isSelected ? theme.colors.black : theme.colors.primary,
      fontFamily: !!!props.isSelected ? "nunitoRegular" : "nunitoBold",
    },
  })
);
