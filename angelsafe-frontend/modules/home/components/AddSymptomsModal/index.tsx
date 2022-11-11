import React, { useRef, useState } from "react";
import {
  FlatList,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  GestureResponderEvent,
} from "react-native";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import useDarkMode from "@/shared/hooks/useDarkMode";
import {
  setAdditionalSymptoms,
  setInitialSymptoms,
} from "@/shared/state/reducers/experience";
import { StyleConstants } from "@/shared/styles";
import {
  Button,
  CheckBox,
  Input,
  ListItem,
  makeStyles,
  Text,
} from "@rneui/themed";
import Modal from "react-native-modal";

interface IModalProps {
  isVisible: boolean;
  onCancel: () => void;
}

const HEIGHT = Dimensions.get("window").height;
const AddSymptomsModal = (props: IModalProps) => {
  const animation = useRef(new Animated.Value(0)).current;
  const isDark = useDarkMode();
  const [customSymptoms, setCustomSymptoms] = useState("");
  const styles = useStyles();
  const { initialSymptoms, additionalSymptoms } = useAppSelector(
    (state) => state.experience
  );
  const dispatch = useAppDispatch();

  const handleClose = () => {
    props.onCancel();
  };

  const handleAddSymptom = (item: string) => () => {
    dispatch(setInitialSymptoms(item));
  };

  const handleSubmit = () => {
    handleClose();
  };

  const handleInputChange = (text: string) => {
    setCustomSymptoms(text);
  };

  const handleAddCustomSymptom = () => {
    if (customSymptoms.length > 2) {
      dispatch(setAdditionalSymptoms(customSymptoms));
      setCustomSymptoms("");
    }
  };

  const handleAnimation = (event: GestureResponderEvent) => {
    Animated.spring(animation, {
      toValue: event.nativeEvent.pageY * 1.5,
      useNativeDriver: false,
      speed: 40,
    }).start();
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
          <View style={styles.notch} />
          <Text h2 style={{ textAlign: "center", marginBottom: 36 }}>
            Add Symptoms
          </Text>
          <Input
            style={styles.input}
            placeholder="Custom symptoms"
            maxLength={30}
            autoCapitalize="none"
            value={customSymptoms}
            rightIcon={{
              type: "ionicon",
              name: "add",
              onPress: handleAddCustomSymptom,
              containerStyle: styles.inputIconContainerStyle,
            }}
            onChangeText={handleInputChange}
            {...(isDark && {
              inputStyle: {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              },
            })}
          />
          <FlatList
            data={additionalSymptoms}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={handleAddSymptom(item)}
              >
                <ListItem bottomDivider>
                  <View style={styles.listItemWrapper}>
                    <Text>{item}</Text>
                    <CheckBox checked={initialSymptoms.includes(item)} />
                  </View>
                </ListItem>
              </TouchableOpacity>
            )}
          />
          <Button
            title="Done"
            onPress={handleSubmit}
            containerStyle={{
              marginBottom: 24,
            }}
          />
        </View>
      </Animated.View>
    </Modal>
  );
};

export default AddSymptomsModal;

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
  inputIconContainerStyle: {
    // height: "100%",
    // backgroundColor: theme.colors.grey1,
    // justifyContent: "center",
  },
}));
