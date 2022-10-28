import { StyleSheet, Text, useColorScheme, View } from "react-native";
import React, { useEffect } from "react";
import { setSolidBackground } from "../state/reducers/theme";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from ".";

const useSetSolidBackground = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (colorScheme === "light") {
        dispatch(setSolidBackground(true));
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      if (colorScheme === "light") {
        dispatch(setSolidBackground(false));
      }
    });
    return unsubscribe;
  }, []);

  return null;
};

export default useSetSolidBackground;

const styles = StyleSheet.create({});
