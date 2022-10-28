import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from "react-native";
import { Button, Divider, makeStyles, Text, useTheme } from "@rneui/themed";
import { Container } from "@/shared/components";
import { StyleConstants } from "@/shared/styles";
import { ProfileParamsList } from "../types";
import { Avatar, Biography } from "../components";
import { StackScreenProps } from "@react-navigation/stack";
import useChangeTopBarBg from "@/shared/hooks/useChangeTopBarBg";
import AboutMeTab from "../components/AboutMe";
import useSetSolidBackground from "@/shared/hooks/useSetSolidBackground";
import useDarkMode from "@/shared/hooks/useDarkMode";

const deviceHeight = Dimensions.get("window").height;

enum ProfileView {
  ABOUT_ME,
  POST,
}

const EntryScreen = ({
  navigation,
}: StackScreenProps<ProfileParamsList, "Entry">) => {
  const [bounces, setBounces] = useState(false);
  const [view, setView] = useState(ProfileView.ABOUT_ME);
  const { theme } = useTheme();
  const isDark = useDarkMode();

  const styles = useStyles({ isDark });

  useSetSolidBackground();

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;

    if (y > deviceHeight - (deviceHeight - 200)) {
      setBounces(true);
    } else {
      setBounces(false);
    }
  };

  const handleSelection = (selection: ProfileView) => () => {
    setView(selection);
  };

  const renderView = () => {
    switch (view) {
      case ProfileView.ABOUT_ME: {
        return (
          <View style={styles.contentWrapper}>
            <AboutMeTab />
          </View>
        );
      }
      case ProfileView.POST: {
        return (
          <View style={styles.contentWrapper}>
            <Text>klsjadf</Text>
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
          opacity: isDark ? 0 : 1,
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
          <Avatar
            containerStyle={{
              marginVertical: 24,
            }}
          />
          <Biography />
        </View>

        <View style={styles.containerBottom}>
          <View style={styles.tab}>
            <TouchableOpacity
              style={[
                styles.tabLabelContainer,
                {
                  borderBottomColor:
                    view === ProfileView.ABOUT_ME
                      ? theme.colors.primary
                      : "transparent",
                },
              ]}
              onPress={handleSelection(ProfileView.ABOUT_ME)}
            >
              <Text style={styles.tabLabel}>About Me</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabLabelContainer,
                {
                  borderBottomColor:
                    view === ProfileView.POST
                      ? theme.colors.primary
                      : "transparent",
                },
              ]}
              onPress={handleSelection(ProfileView.POST)}
            >
              <Text style={styles.tabLabel}>Post</Text>
            </TouchableOpacity>
          </View>

          <Divider style={styles.divider} />

          {renderView()}
        </View>
      </Container>
    </Container>
  );
};

export default EntryScreen;

const useStyles = makeStyles((theme, props: { isDark: boolean }) => ({
  wrapper: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    justifyContent: "flex-start",
    backgroundColor: props.isDark ? theme.colors.grey1 : "transparent",
  },
  containerTop: {
    backgroundColor: theme.colors.background,
    minWidth: "100%",
    borderBottomLeftRadius: StyleConstants.PADDING_HORIZONTAL,
    borderBottomRightRadius: StyleConstants.PADDING_HORIZONTAL,
    paddingHorizontal: StyleConstants.PADDING_HORIZONTAL,
    paddingVertical: StyleConstants.PADDING_VERTICAL,
  },
  containerBottom: {
    paddingVertical: 12,
    paddingHorizontal: 0,
    width: "100%",
  },
  divider: { top: -14 },
  tab: {
    flexDirection: "row",
    paddingHorizontal: StyleConstants.PADDING_HORIZONTAL,
  },
  tabLabelContainer: {
    borderBottomWidth: 4,
    borderBottomColor: "transparent",
    minWidth: 100,
    paddingBottom: 8,
    marginVertical: 12,
    marginRight: 12,
  },
  tabLabel: {
    fontFamily: "nunitoBold",
    textAlign: "center",
    fontSize: 18,
  },
  contentWrapper: {
    paddingHorizontal: StyleConstants.PADDING_HORIZONTAL,
    paddingVertical: 12,
    flex: 1,
  },
}));
