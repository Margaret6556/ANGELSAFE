import { StyleSheet } from "react-native";

export const buttomBottomPosition = 48;

export enum StyleConstants {
  PADDING_HORIZONTAL = 12,
  PADDING_VERTICAL = 20,
  BUTTON_BOTTOM_POSITION = 48,
  GAP_BOTTOM = 12,
  GAP_VERTICAL = 8,
  MIN_HEIGHT = 700,
  HEADER_TEXT_HEIGHT = 64,
  BUTTON_HEIGHT = 50,
}

export const containerStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: StyleConstants.PADDING_VERTICAL,
    paddingHorizontal: StyleConstants.PADDING_HORIZONTAL,
  },
});
