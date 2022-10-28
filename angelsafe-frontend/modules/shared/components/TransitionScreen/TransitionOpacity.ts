import { TransitionSpecs } from "@react-navigation/stack";

const TransitionOpacity = {
  cardStyle: { backgroundColor: "transparent" },
  // gestureDirection: "horizontal",
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: ({ current, next }: any) => {
    if (next?.progress) {
      return {
        cardStyle: {
          opacity: next.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
        },
      };
    }

    return {
      cardStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      },
    };
  },
};

export default TransitionOpacity;
