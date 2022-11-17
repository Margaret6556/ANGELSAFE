import { Animated, TouchableOpacity } from "react-native";
import React from "react";
import {
  Avatar,
  Divider,
  DividerProps,
  Icon,
  makeStyles,
  Text,
  useTheme,
} from "@rneui/themed";
import { moderateScale, scale } from "react-native-size-matters";

interface GroupDetailHeaderProps {
  animation: Animated.Value;
  groupname: string;
  profilePic: string;
  onNavigationBack: () => void;
}

const GroupDetailHeader = (props: GroupDetailHeaderProps) => {
  const styles = useStyles();
  const { theme } = useTheme();

  const handleNavigationBack = () => {
    props.onNavigationBack();
  };

  return (
    <>
      <Animated.View style={[styles.container]}>
        <Animated.View
          style={{
            transform: [
              {
                translateX: props.animation.interpolate({
                  inputRange: [0, scale(100)],
                  outputRange: [scale(5), 0],
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
        >
          <TouchableOpacity onPress={handleNavigationBack}>
            <Icon
              name="chevron-back-outline"
              color={theme.colors.primary}
              type="ionicon"
              size={moderateScale(32)}
              iconStyle={{
                alignSelf: "flex-start",
              }}
            />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[
            styles.wrapper,
            {
              transform: [
                {
                  translateY: props.animation.interpolate({
                    inputRange: [0, scale(200)],
                    outputRange: [scale(50), 0],
                    extrapolate: "clamp",
                  }),
                },
              ],
            },
          ]}
        >
          <Avatar
            source={{ uri: props.profilePic }}
            rounded
            containerStyle={{ marginRight: theme.spacing.md }}
            size={moderateScale(22)}
          />
          <Text style={styles.text}>{props.groupname}</Text>
        </Animated.View>
      </Animated.View>
      <AnimatedDivider
        color={theme.colors.black}
        style={{
          width: "100%",
          zIndex: 5,
          opacity: props.animation.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
          }),
        }}
      />
    </>
  );
};

export default GroupDetailHeader;

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    backgroundColor: theme.colors.background,
    paddingVertical: theme.spacing.md,
    justifyContent: "center",
    overflow: "hidden",
    zIndex: 2,
  },
  wrapper: {
    position: "absolute",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    color: theme.colors.primary,
    fontFamily: "nunitoBold",
  },
}));

class _Divider extends React.Component<DividerProps> {
  render(): React.ReactNode {
    return <Divider {...this.props} />;
  }
}

const AnimatedDivider = Animated.createAnimatedComponent(_Divider);
