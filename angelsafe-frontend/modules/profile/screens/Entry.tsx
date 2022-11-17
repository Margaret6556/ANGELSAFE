import React, { useCallback, useRef, useState } from "react";
import {
  View,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Divider, makeStyles, Text } from "@rneui/themed";
import { Container } from "@/shared/components";
import { StyleConstants } from "@/shared/styles";
import { ProfileParamsList } from "../types";
import { Avatar, Biography } from "../components";
import { StackScreenProps } from "@react-navigation/stack";
import AboutMeTab from "../components/AboutMe";
import useSetSolidBackground from "@/shared/hooks/useSetSolidBackground";
import MyPosts from "../components/MyPosts";
import useIsDark from "@/shared/hooks/useIsDark";
import { moderateScale, scale } from "react-native-size-matters";
import { sizing } from "@/shared/providers/ThemeProvider";

enum ProfileView {
  ABOUT_ME,
  POST,
}

const EntryScreen = ({}: StackScreenProps<ProfileParamsList, "Entry">) => {
  const [bounces, setBounces] = useState(false);
  const [view, setView] = useState(ProfileView.ABOUT_ME);
  const isDark = useIsDark();
  const animateAboutMe = useRef(new Animated.Value(0)).current;
  const animatePosts = useRef(new Animated.Value(0)).current;

  const styles = useStyles({ isDark });

  useSetSolidBackground();

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    setBounces(y > 100);
  };

  const handleSelection = (selection: ProfileView) => () => {
    setView(selection);
  };

  const animate = useCallback((animation: Animated.Value, toValue: number) => {
    Animated.timing(animation, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  const renderView = () => {
    switch (view) {
      case ProfileView.ABOUT_ME: {
        animate(animatePosts, 0);
        animate(animateAboutMe, 2);
        return (
          <View style={styles.contentWrapper}>
            <AboutMeTab />
          </View>
        );
      }
      case ProfileView.POST: {
        animate(animateAboutMe, 0);
        animate(animatePosts, 2);
        return (
          <View style={styles.contentWrapper}>
            <MyPosts />
          </View>
        );
      }
      default: {
        return null;
      }
    }
  };

  return (
    <Container
      type="image"
      containerProps={{
        style: styles.wrapper,
        imageStyle: {
          opacity: +!isDark,
        },
      }}
    >
      <Container
        type="scroll"
        containerProps={{
          contentContainerStyle: styles.wrapper,
          showsVerticalScrollIndicator: false,
          bounces: bounces,
          onScroll: handleScroll,
          scrollEventThrottle: 16,
        }}
      >
        <View style={styles.containerTop}>
          <Text h2>Profile</Text>
          <Avatar containerStyle={styles.avatarContainer} />
          <Biography />
        </View>

        <View style={styles.containerBottom}>
          <View style={styles.tab}>
            <TouchableOpacity
              style={[
                styles.tabLabelContainer,
                view === ProfileView.ABOUT_ME ? styles.tabLabelActive : {},
              ]}
              onPress={handleSelection(ProfileView.ABOUT_ME)}
            >
              <Text style={styles.tabLabel}>About Me</Text>
              <ActiveViewBorder animatedValue={animateAboutMe} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabLabelContainer,
                view === ProfileView.POST ? styles.tabLabelActive : {},
              ]}
              onPress={handleSelection(ProfileView.POST)}
            >
              <Text style={styles.tabLabel}>My Posts</Text>
              <ActiveViewBorder animatedValue={animatePosts} />
            </TouchableOpacity>
          </View>

          <Divider style={styles.divider} />

          {renderView()}
        </View>
      </Container>
    </Container>
  );
};

const ActiveViewBorder = (props: { animatedValue: Animated.Value }) => {
  const styles = useStyles();
  return (
    <Animated.View
      style={[
        styles.activeViewBorder,
        {
          transform: [
            {
              scaleX: props.animatedValue.interpolate({
                inputRange: [0, 2],
                outputRange: [0, 1],
              }),
            },
          ],
        },
      ]}
    />
  );
};

const useStyles = makeStyles((theme, props: { isDark: boolean }) => ({
  wrapper: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    justifyContent: "flex-start",
    backgroundColor: props.isDark ? theme.colors.white : "transparent",
  },
  avatarContainer: {
    marginVertical: theme.spacing.lg,
  },
  containerTop: {
    backgroundColor: theme.colors.background,
    minWidth: "100%",
    borderBottomLeftRadius: theme.spacing.lg,
    borderBottomRightRadius: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
  },
  containerBottom: {
    paddingHorizontal: theme.spacing.lg,
    width: "100%",
  },
  divider: { top: scale(-13), zIndex: 1 },
  tab: {
    flexDirection: "row",
    paddingHorizontal: StyleConstants.PADDING_HORIZONTAL,
  },
  tabLabelContainer: {
    zIndex: 2,
    minWidth: moderateScale(100),
    marginVertical: theme.spacing.lg,
    marginRight: theme.spacing.lg,
  },
  tabLabelActive: {
    borderColor: theme.colors.primary,
  },
  tabLabel: {
    fontFamily: "nunitoBold",
    textAlign: "center",
    fontSize: sizing.FONT.sm,
    color: theme.colors.black,
  },
  contentWrapper: {
    paddingBottom: theme.spacing.lg,
  },
  activeViewBorder: {
    height: moderateScale(4),
    minWidth: moderateScale(40),
    borderRadius: moderateScale(10),
    backgroundColor: theme.colors.primary,
  },
}));

export default EntryScreen;
