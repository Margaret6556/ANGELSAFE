import { ChatParamsList, MoreParamsList } from "@/more/types";
import { useLazyLogoutQuery } from "@/shared/api/auth";
import { useAppDispatch } from "@/shared/hooks";
import { logout } from "@/shared/state/reducers/auth/actions";
import { AppTabParamList } from "@/shared/types";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import Card from "../List/Card";

const GroupChatComponent = () => {
  const dispatch = useAppDispatch();
  const [_logout, logoutRes] = useLazyLogoutQuery();
  const navigation = useNavigation<NavigationProp<MoreParamsList>>();

  const handleMessagesPress = () => {
    navigation.navigate("Chat");
  };

  return (
    <View style={styles.container}>
      <Card icon={{}} label="Messages" onPress={handleMessagesPress} />
    </View>
  );
};

export default GroupChatComponent;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});
