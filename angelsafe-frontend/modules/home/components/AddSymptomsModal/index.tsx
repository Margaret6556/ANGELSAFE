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
import {
  setAdditionalSymptoms,
  setInitialSymptoms,
} from "@/shared/state/reducers/experience";
import { Button, Input, ListItem, makeStyles, Text } from "@rneui/themed";
import Modal from "react-native-modal";
import { sizing } from "@/shared/providers/ThemeProvider";
import useIsDark from "@/shared/hooks/useIsDark";

interface IModalProps {
  isVisible: boolean;
  onCancel: () => void;
}

const HEIGHT = Dimensions.get("window").height;
const AddSymptomsModal = (props: IModalProps) => {
  const animation = useRef(new Animated.Value(0)).current;
  const isDark = useIsDark();
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
          <Text h2 style={styles.title}>
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
              size: sizing.ICON,
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
                style={styles.row}
              >
                <ListItem bottomDivider>
                  <View style={styles.listItemWrapper}>
                    <Text>{item}</Text>
                    <ListItem.CheckBox
                      checked={initialSymptoms.includes(item)}
                      onPress={handleAddSymptom(item)}
                    />
                  </View>
                </ListItem>
              </TouchableOpacity>
            )}
          />
          <Button
            title="Done"
            onPress={handleSubmit}
            // containerStyle={{
            //   marginBottom: 24,
            // }}
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
    height: "90%",
    width: "100%",
    marginTop: "auto",
    backgroundColor: theme.colors.background,
    justifyContent: "space-between",
    borderTopLeftRadius: theme.spacing.lg,
    borderTopRightRadius: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
  },
  buttonContainer: {
    width: "100%",
  },
  notch: {
    width: "12%",
    height: theme.spacing.sm,
    borderRadius: theme.spacing.xl,
    backgroundColor: theme.colors.black,
    alignSelf: "center",
    marginBottom: theme.spacing.xl,
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
  row: {
    paddingVertical: theme.spacing.sm,
  },
  title: { textAlign: "center", marginBottom: theme.spacing.lg },
}));
