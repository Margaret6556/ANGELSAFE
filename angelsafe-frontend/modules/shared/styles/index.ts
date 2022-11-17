import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";

export const buttomBottomPosition = 48;

export const StyleConstants = {
  PADDING_HORIZONTAL: scale(12),
  PADDING_VERTICAL: scale(20),
  BUTTON_BOTTOM_POSITION: 48,
  GAP_BOTTOM: 12,
  GAP_VERTICAL: 8,
  HEADER_TEXT_HEIGHT: 64,
  // BUTTON_HEIGHT : scale(50),
  BUTTON_HEIGHT: 50,
};

export const containerStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: StyleConstants.PADDING_VERTICAL,
    paddingHorizontal: StyleConstants.PADDING_HORIZONTAL,
  },
});
