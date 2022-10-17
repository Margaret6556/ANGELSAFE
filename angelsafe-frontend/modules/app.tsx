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

// import ChatStack from "./chat";

export type TabParamList = {
  Alerts: undefined;
  Auth: undefined;
  Chat: undefined;
  Home: undefined;
  Groups: undefined;
  More: undefined;
  Profile: undefined;
};

const BottomTab = createBottomTabNavigator<TabParamList>();

const App = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  useRestoreSession();

  return (
    <BottomTab.Navigator
      screenOptions={{
        header: () => null,
        tabBarStyle: {},
      }}
      initialRouteName="Auth"
    >
      {isLoggedIn ? (
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
      ) : (
        <BottomTab.Screen
          name="Auth"
          component={Auth}
          options={{
            tabBarStyle: { display: "none" },
          }}
        />
      )}
    </BottomTab.Navigator>
  );
};

export default App;
