import React, { useRef, useState } from "react";
import {
  FlatList,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  GestureResponderEvent,
  StyleSheet,
} from "react-native";
import useDarkMode from "@/shared/hooks/useDarkMode";
import { StyleConstants } from "@/shared/styles";
import { Input, ListItem, makeStyles, Text } from "@rneui/themed";
import Modal from "react-native-modal";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { GroupDetailsParamList, GroupParamsList } from "@/groups/types";

interface IModalProps {
  isVisible: boolean;
  onCancel: () => void;
  groups: { groupname: string; id: string }[];
}

const HEIGHT = Dimensions.get("window").height;
const SearchModal = (props: IModalProps) => {
  const animation = useRef(new Animated.Value(0)).current;
  const [searchResults, setSearchResults] = useState("");
  const [filteredGroups, setFilteredGroups] = useState(props.groups);
  const navigation =
    useNavigation<NavigationProp<GroupParamsList, "GroupDetails">>();
  const isDark = useDarkMode();
  const styles = useStyles();

  const handleClose = () => {
    props.onCancel();
  };

  const handleInputChange = (text: string) => {
    setSearchResults(text);
    const filtered = props.groups.filter(({ groupname }) => {
      return groupname.toLowerCase().includes(text);
    });

    setFilteredGroups(filtered);
  };

  const handleAnimation = (event: GestureResponderEvent) => {
    Animated.spring(animation, {
      toValue: event.nativeEvent.pageY * 1.5,
      useNativeDriver: false,
      speed: 40,
    }).start();
  };

  const handleNavigate = (id: string) => () => {
    handleClose();
    navigation.navigate("GroupDetails", {
      screen: "Details",
      params: {
        id,
      },
    });
  };

  return (
    <Modal
      isVisible={props.isVisible}
      style={styles.wrapper}
      onBackdropPress={handleClose}
      avoidKeyboard
      useNativeDriverForBackdrop
      presentationStyle="overFullScreen"
      onStartShouldSetResponder={() => true}
      onResponderRelease={(e) => {
        const threshold = HEIGHT * 0.6;
        if (e.nativeEvent.pageY > threshold) {
          handleClose();
        } else {
          Animated.timing(animation, {
            toValue: 100,
            duration: 200,
            useNativeDriver: false,
          }).start();
        }
      }}
      onResponderMove={handleAnimation}
    >
      <Animated.View
        style={[
          styles.container,
          {
            maxHeight: animation.interpolate({
              inputRange: [0, HEIGHT],
              outputRange: ["100%", "35%"],
              extrapolate: "clamp",
            }),
          },
        ]}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.notch} />
            <Input
              style={styles.input}
              placeholder="Search groups"
              maxLength={30}
              autoCapitalize="none"
              autoCorrect={false}
              value={searchResults}
              onChangeText={handleInputChange}
              rightIcon={{
                type: "ionicon",
                name: "close",
                onPress: handleClose,
                containerStyle: styles.inputIconContainerStyle,
              }}
              {...(isDark && {
                inputStyle: {
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                },
              })}
            />
          </View>
          <FlatList
            data={filteredGroups}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={handleNavigate(item.id)}
              >
                <ListItem bottomDivider>
                  <View style={styles.listItemWrapper}>
                    <Text>{item.groupname}</Text>
                  </View>
                </ListItem>
              </TouchableOpacity>
            )}
            ListFooterComponent={<View style={{ marginVertical: 40 }} />}
          />
        </View>
      </Animated.View>
    </Modal>
  );
};

export default SearchModal;

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: 0,
    width: "100%",
  },
  container: {
    flex: 0,
    height: "90%",
    width: "100%",
    marginTop: "auto",
    backgroundColor: theme.colors.background,
    justifyContent: "space-between",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingHorizontal: StyleConstants.PADDING_HORIZONTAL,
    paddingVertical: StyleConstants.PADDING_VERTICAL,
  },
  header: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  buttonContainer: {
    width: "100%",
  },
  notch: {
    width: "12%",
    height: 4,
    borderRadius: 10,
    backgroundColor: theme.colors.black,
    alignSelf: "center",
    marginBottom: 24,
  },
  contentSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: StyleConstants.PADDING_VERTICAL,
  },
  content: {
    width: "100%",
    flex: 1,
  },
  labelSelection: {
    fontFamily: "nunitoBold",
  },
  listItemWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  input: {
    backgroundColor: theme.colors.grey5,
  },
  inputIconContainerStyle: {},
}));
