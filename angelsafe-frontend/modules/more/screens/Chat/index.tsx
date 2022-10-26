import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import { ChatParamsList, MoreParamsList } from "@/more/types";
import ChatList from "./ChatList";
import ChatInterface from "./ChatInterface";
import { TransitionScreen } from "@/shared/components";
import { useTheme, Avatar } from "@rneui/themed";
import HeaderChatInterface from "@/more/components/Chat/Header";

const MoreStack = createStackNavigator<ChatParamsList>();

const ChatScreen = ({
  navigation,
}: StackScreenProps<MoreParamsList, "Chat">) => {
  const { theme } = useTheme();
  return (
    <MoreStack.Navigator
      initialRouteName="ChatList"
      // screenOptions={{
      //   ...TransitionScreen,
      // }}
    >
      <MoreStack.Screen
        name="ChatList"
        component={ChatList}
        options={{
          header: () => null,
        }}
      />
      <MoreStack.Screen
        name="ChatInterface"
        component={ChatInterface}
        options={{
          presentation: "modal",
          cardOverlayEnabled: false,
          header: ({ navigation }) => (
            <HeaderChatInterface onBack={navigation.goBack} />
          ),
        }}
      />
    </MoreStack.Navigator>
  );
};

export default ChatScreen;
