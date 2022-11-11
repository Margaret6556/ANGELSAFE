const TransitionModal: any = {
  presentation: "modal",
  detachPreviousScreen: false,
  gestureEnabled: true,
  cardStyleInterpolator: ({ next, current, layouts }: any) => {
    if (next?.progress) {
      return {
        cardStyle: {
          transform: [
            {
              scale: next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.8],
              }),
            },
            {
              translateY: next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 50],
              }),
            },
          ],
        },
      };
    }

    return {
      cardStyle: {
        maxHeight: "92%",
        marginTop: "auto",
        transform: [
          {
            translateY: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.height, 0],
              extrapolate: "clamp",
            }),
          },
        ],
      },
    };
  },
};

export default TransitionModal;
