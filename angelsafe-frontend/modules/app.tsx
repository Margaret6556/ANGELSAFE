import React from "react";
import Auth from "./auth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAppSelector } from "@/shared/hooks";
import HomeStack from "./home";
import ProfileStack from "./profile";
import GroupStack from "./groups";
import AlertStack from "./alerts";
import MoreStack from "./more";
import useRestoreSession from "./shared/hooks/useRestoreSession";
import { createStackNavigator } from "@react-navigation/stack";
import { AppTabParamList, RootStackParamList } from "./shared/types";
import { Loading, TabBarIcon, TransitionSlide } from "./shared/components";
import useThemeMode from "./shared/hooks/useThemeMode";

const RootStack = createStackNavigator<RootStackParamList>();
const App = () => {
  useThemeMode();
  const status = useRestoreSession();
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "done") {
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
  }

  return null;
};

const BottomTab = createBottomTabNavigator<AppTabParamList>();
const TabNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        header: () => null,
        tabBarStyle: {},
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
            tabBarHideOnKeyboard: true,
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
            // tabBarHideOnKeyboard: true,
          }}
        />
        <BottomTab.Screen
          name="Alerts"
          component={AlertStack}
          options={{
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
            tabBarHideOnKeyboard: true,
          }}
        />
      </BottomTab.Group>
    </BottomTab.Navigator>
  );
};

export default App;
