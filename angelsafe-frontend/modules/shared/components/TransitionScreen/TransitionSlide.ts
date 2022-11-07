import { TransitionSpecs } from "@react-navigation/stack";

const TransitionScreen = {
  cardStyle: { backgroundColor: "transparent" },
  // gestureDirection: "horizontal",
  transitionSpec: {
    open: {
      ...TransitionSpecs.FadeInFromBottomAndroidSpec,
      config: {
        ...TransitionSpecs.FadeInFromBottomAndroidSpec.config,
      },
    },
    close: TransitionSpecs.FadeOutToBottomAndroidSpec,
  },
  cardStyleInterpolator: ({ current, next, layouts }: any) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          {
            translateX: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -layouts.screen.width],
                })
              : 0,
          },
        ],
      },
    };
  },
};

export default TransitionScreen;
