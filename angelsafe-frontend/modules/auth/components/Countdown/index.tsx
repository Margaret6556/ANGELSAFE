import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import Countdown, {
  CountdownRenderProps,
  CountdownTimeDelta,
} from "react-countdown";
import { Text } from "@rneui/themed";

interface CountdownProps {
  onComplete: (completed: boolean) => void;
}

const TEN_MINUTES = 0.2 * 60 * 1000;
const CountdownTimer = ({ onComplete }: CountdownProps) => {
  const renderer = ({ formatted }: CountdownRenderProps) => (
    <Text>
      {formatted.minutes}:{formatted.seconds}
    </Text>
  );

  const handleComplete = ({ completed }: CountdownTimeDelta) => {
    onComplete(completed);
  };
  return (
    <Countdown
      date={Date.now() + TEN_MINUTES}
      renderer={renderer}
      onComplete={handleComplete}
    />
  );
};

export default React.memo(CountdownTimer);

const styles = StyleSheet.create({});
