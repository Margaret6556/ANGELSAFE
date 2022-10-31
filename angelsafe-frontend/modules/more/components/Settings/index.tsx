import { MoreParamsList } from "@/more/types";
import { useAppDispatch } from "@/shared/hooks";
import { logout } from "@/shared/state/reducers/auth/actions";
import { AppTabParamList } from "@/shared/types";
import logger from "@/shared/utils/logger";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import Card from "../List/Card";

const SettingsComponent = () => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NavigationProp<AppTabParamList & MoreParamsList>>();

  const handleAccountPress = () => {
    navigation.navigate("Profile");
  };
  const handleAccountSecurity = () => {
    navigation.navigate("Account Security");
  };
  const handleAccessibility = () => {};

  const handleLogout = async () => {
    try {
      dispatch(logout());
    } catch (e) {
      logger("auth", e as any);
    }
  };
  const handleNotificationPress = () => {
    navigation.navigate("Alerts");
  };

  const showAlert = () =>
    Alert.alert(
      "Log out of AngelSafe?",
      "",
      [
        {
          text: "Log out",
          onPress: handleLogout,
          style: "destructive",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  return (
    <>
      <View style={styles.container}>
        <Card
          icon={{ name: "person-circle", type: "ionicon" }}
          label="Your Account"
          onPress={handleAccountPress}
        />
      </View>
      <View style={styles.container}>
        <Card
          icon={{ name: "lock", type: "material-community" }}
          label="Account Security"
          onPress={handleAccountSecurity}
        />
      </View>
      <View style={styles.container}>
        <Card
          icon={{ name: "notifications-on", type: "material" }}
          label="Notifications"
          onPress={handleNotificationPress}
        />
      </View>
      <View style={styles.container}>
        <Card
          icon={{ name: "accessibility", type: "material" }}
          label="Accessiblity"
          onPress={handleAccessibility}
        />
      </View>
      <View style={styles.container}>
        <Card
          icon={{ name: "wrench", type: "material-community" }}
          label="Test API"
          onPress={handleAccessibility}
        />
      </View>
      <View style={styles.container}>
        <Card
          icon={{ name: "logout", type: "material" }}
          label="Logout"
          onPress={showAlert}
        />
      </View>
    </>
  );
};

export default SettingsComponent;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});
