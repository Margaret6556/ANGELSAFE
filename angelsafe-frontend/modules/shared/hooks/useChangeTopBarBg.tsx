import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { setBackgroundColor } from "../state/reducers/theme";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from ".";

const useChangeTopBarBg = (color: string) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () =>
      dispatch(setBackgroundColor(color))
    );
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () =>
      dispatch(setBackgroundColor("transparent"))
    );
    return unsubscribe;
  }, []);

  return null;
};

export default useChangeTopBarBg;

const styles = StyleSheet.create({});
