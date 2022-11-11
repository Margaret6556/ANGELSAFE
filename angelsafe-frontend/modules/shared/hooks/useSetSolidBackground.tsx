import { useCallback, useEffect } from "react";
import { useColorScheme } from "react-native";
import { setSafeAreaBg } from "../state/reducers/theme";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useAppDispatch } from ".";
import { useTheme } from "@rneui/themed";

const useSetSolidBackground = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();
  const { theme } = useTheme();
  const focused = useIsFocused();

  const setBg = useCallback(
    (value: string) => () => {
      dispatch(setSafeAreaBg(value));
    },
    []
  );

  useEffect(() => {
    const color = theme.colors.background;
    const unsubscribe = navigation.addListener("focus", setBg(color));
    if (focused) {
      setBg(color)();
    }
    return unsubscribe;
  }, [colorScheme, focused]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", setBg("transparent"));
    return unsubscribe;
  }, []);

  return null;
};

export default useSetSolidBackground;
