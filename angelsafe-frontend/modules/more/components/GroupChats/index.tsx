import React from "react";
import { MoreParamsList } from "@/more/types";
import { useAppDispatch } from "@/shared/hooks";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import Card from "../List/Card";

const GroupChatComponent = () => {
  const navigation = useNavigation<NavigationProp<MoreParamsList>>();

  const handleMessagesPress = () => {
    navigation.navigate("Chat");
  };

  return (
    <View style={styles.container}>
      <Card
        icon={{ name: "message-text", type: "material-community" }}
        label="Messages"
        onPress={handleMessagesPress}
      />
    </View>
  );
};

export default GroupChatComponent;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});
