import { StyleSheet, View, ImageSourcePropType } from "react-native";
import React, { useCallback } from "react";
import { Text, Image, makeStyles } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { Moods, setMood } from "@/shared/state/reducers/experience";
import { MoodsType } from "@/home/types";

const MoodsButtons = ({ label, image }: Omit<MoodsType, "id">) => {
  const dispatch = useAppDispatch();
  const { mood, isEditableToday } = useAppSelector((state) => state.experience);

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
      // disabled={!isEditableToday}
    >
      <View style={styles.container}>
        <Image
          source={image}
          style={styles.image}
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
      height: 56,
      width: 56,
    },
    image: {
      width: "100%",
      height: "100%",
    },
    label: {
      fontSize: 14,
      marginTop: 4,
      color: !!!props.isSelected ? theme.colors.black : theme.colors.primary,
      fontFamily: !!!props.isSelected ? "nunitoRegular" : "nunitoBold",
    },
  })
);
