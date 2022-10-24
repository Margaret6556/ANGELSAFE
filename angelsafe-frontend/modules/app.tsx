import React, { useEffect } from "react";
import Auth from "./auth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAppSelector } from "@/shared/hooks";
import { Icon } from "@rneui/themed";
import HomeStack from "./home";
import ProfileStack from "./profile";
import GroupStack from "./groups";
import AlertStack from "./alerts";
import MoreStack from "./more";
import useRestoreSession from "./shared/hooks/useRestoreSession";
import { createStackNavigator } from "@react-navigation/stack";
import { AppTabParamList, RootStackParamList } from "./shared/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native";
import { TransitionScreen } from "./shared/components";
import useThemeMode from "./shared/hooks/useThemeMode";

// import ChatStack from "./chat";

const RootStack = createStackNavigator<RootStackParamList>();
const App = () => {
  useThemeMode();
  const status = useRestoreSession();
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  if (status === "loading") {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  if (status === "done") {
    return (
      <RootStack.Navigator
        screenOptions={{
          header: () => null,
          ...TransitionScreen,
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
const TabNavigator = () => (
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
            <Icon name="home" color={focused ? "lightblue" : "#464646"} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="person-circle"
              type="ionicon"
              color={focused ? "lightblue" : "#464646"}
            />
          ),
        }}
      />
      {/* <BottomTab.Screen name="Chat" component={ChatStack} /> */}
      <BottomTab.Screen
        name="Groups"
        component={GroupStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="group"
              type="material"
              color={focused ? "lightblue" : "#464646"}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Alerts"
        component={AlertStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="bell"
              type="material-community"
              color={focused ? "lightblue" : "#464646"}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="More"
        component={MoreStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="more-horiz"
              type="material"
              color={focused ? "lightblue" : "#464646"}
            />
          ),
        }}
      />
    </BottomTab.Group>
  </BottomTab.Navigator>
);

export default App;
