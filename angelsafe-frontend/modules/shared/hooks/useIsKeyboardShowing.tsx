import { Keyboard } from "react-native";
import { useEffect, useState } from "react";

const useIsKeyboardShowing = () => {
  const [keyboardIsShown, setKeyboardIsShown] = useState(false);
  const [keyboardIsShowing, setKeyboardIsShowing] = useState(false);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", handleKeyboardIsShown);
    Keyboard.addListener("keyboardDidHide", handleKeyboardIsHidden);
    Keyboard.addListener("keyboardWillShow", handleKeyboardIsShowing);
    Keyboard.addListener("keyboardWillHide", handleKeyboardIsHiding);

    return () => {
      Keyboard.removeAllListeners("keyboardDidShow");
      Keyboard.removeAllListeners("keyboardDidHide");
    };
  }, []);

  const handleKeyboardIsShown = () => {
    setKeyboardIsShown(true);
  };

  const handleKeyboardIsHidden = () => {
    setKeyboardIsShown(false);
  };

  const handleKeyboardIsShowing = () => {
    setKeyboardIsShowing(true);
  };

  const handleKeyboardIsHiding = () => {
    setKeyboardIsShowing(false);
  };

  return { keyboardIsShowing, keyboardIsShown };
};

export default useIsKeyboardShowing;
