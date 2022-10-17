import { createStackNavigator } from "@react-navigation/stack";
import { ChatParamsList } from "./types";
import { EntryScreen } from "./screens";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { TabParamList } from "@/app";

const ChatStack = createStackNavigator<ChatParamsList>();

const ChatScreen = ({
  navigation,
}: NativeStackScreenProps<TabParamList, "Chat">) => {
  return (
    <ChatStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "transparent",
        },
      }}
    >
      <ChatStack.Screen name="Entry" component={EntryScreen} />
    </ChatStack.Navigator>
  );
};

export default ChatScreen;
