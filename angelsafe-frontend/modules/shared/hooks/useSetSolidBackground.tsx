import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { setSolidBackground } from "../state/reducers/theme";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from ".";

const useSetSolidBackground = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () =>
      dispatch(setSolidBackground(true))
    );
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () =>
      dispatch(setSolidBackground(false))
    );
    return unsubscribe;
  }, []);

  return null;
};

export default useSetSolidBackground;

const styles = StyleSheet.create({});
