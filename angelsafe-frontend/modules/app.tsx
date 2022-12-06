import React, { useEffect, useState } from "react";
import Auth from "./auth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAppSelector } from "@/shared/hooks";
import HomeStack from "./home";
import ProfileStack from "./profile";
import GroupStack from "./groups";
import AlertStack from "./alerts";
import MoreStack from "./more";
import { createStackNavigator } from "@react-navigation/stack";
import { AppTabParamList, RootStackParamList } from "./shared/types";
import { Loading, TabBarIcon, TransitionSlide } from "./shared/components";
import { useGetNotificationsListQuery } from "./shared/api/alerts";
import { moderateVerticalScale } from "react-native-size-matters";
import { sizing } from "./shared/providers/ThemeProvider";
import { useLazyGetServerVersionQuery } from "./shared/api";
import { SERVER_VERSION, FIVE_MINUTES } from "./shared/config";
import UpdateAppScreen from "./shared/components/UpdateAppScreen";

const RootStack = createStackNavigator<RootStackParamList>();
const App = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const [getVersion, getVersionResponse] = useLazyGetServerVersionQuery();

  useEffect(() => {
    if (!isLoggedIn) {
      getVersion();
    }
  }, [isLoggedIn]);

  if (getVersionResponse.isFetching) {
    return <Loading />;
  }

  if (getVersionResponse.data) {
    if (getVersionResponse.data.data.version !== SERVER_VERSION) {
      return <UpdateAppScreen />;
    }
  }

  return (
    <RootStack.Navigator
      screenOptions={{
        header: () => null,
        ...TransitionSlide,
      }}
    >
      {isLoggedIn ? (
        <RootStack.Screen name="App" component={TabNavigator} />
      ) : (
        <RootStack.Screen name="Auth" component={Auth} />
      )}
    </RootStack.Navigator>
  );
};

const BottomTab = createBottomTabNavigator<AppTabParamList>();

const TabNavigator = () => {
  const { data } = useGetNotificationsListQuery(undefined, {
    pollingInterval: FIVE_MINUTES,
  });
  const [notifBadge, setNotifBadge] = useState(0);

  useEffect(() => {
    if (data && !!data.data.length) {
      const notifs = data?.data.reduce((p, c) => p + (c.read === 1 ? 0 : 1), 0);
      setNotifBadge(notifs);
    }
  }, [data]);

  return (
    <BottomTab.Navigator
      screenOptions={{
        header: () => null,
        tabBarStyle: {
          height: moderateVerticalScale(72),
        },
        tabBarLabelStyle: {
          fontSize: sizing.FONT.xs,
        },
        tabBarIconStyle: {
          maxHeight: moderateVerticalScale(50),
        },
        tabBarLabelPosition: "below-icon",
        // tabBarHideOnKeyboard: Platform.OS === "android",
      }}
      initialRouteName="Home"
    >
      <BottomTab.Group>
        <BottomTab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                iconProps={{ name: "home", type: "family" }}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="Profile"
          component={ProfileStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                iconProps={{ name: "person-circle", type: "ionicon" }}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="Groups"
          component={GroupStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                iconProps={{
                  name: "group",
                  type: "material",
                }}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="Alerts"
          component={AlertStack}
          options={{
            tabBarBadge: notifBadge || undefined,
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                iconProps={{ name: "bell", type: "material-community" }}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="More"
          component={MoreStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                iconProps={{ name: "more-horiz", type: "material" }}
              />
            ),
          }}
        />
      </BottomTab.Group>
    </BottomTab.Navigator>
  );
};

export default App;
