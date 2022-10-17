import { StyleSheet, View } from "react-native";
import React from "react";
import { Container } from "@/shared/components";
import { Icon, Text, Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { StyleConstants } from "@/shared/styles";

type Props = { current: number; title: string };

const index = (props: Props) => {
  const { goBack } = useNavigation();
  const handleBack = () => {
    goBack();
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.controls}>
        {/* <Button
          onPress={handleBack}
          icon={<Icon type="ionicon" name="chevron-back" color="#192A60" />}
          style={{ backgroundColor: "transparent" }}
          buttonStyle={styles.backButtonContainer}
        /> */}
        <Text style={styles.title}>{props.title}</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.horizontalLine} />
        {[1, 2, 3, 4].map((i) => {
          return (
            <View key={i} style={styles.textContainer}>
              {props.current + 1 > i ? (
                <Icon type="antdesign" name="checkcircle" color="#192A60" />
              ) : (
                <Text style={styles.label}>{i}</Text>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  wrapper: {
    flex: 0,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: StyleConstants.PADDING_VERTICAL,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: StyleConstants.HEADER_TEXT_HEIGHT,
  },
  backButtonContainer: {
    backgroundColor: "transparent",
    padding: 0,
    width: 40,
  },
  title: {
    flex: 1,
    textAlign: "center",
    // marginLeft: -20,
  },
  horizontalLine: {
    height: 2,
    width: "80%",
    top: 14,
    position: "absolute",
    backgroundColor: "#192A60",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  textContainer: {
    width: 30,
    height: 30,
    backgroundColor: "#E1C1FF",
    borderColor: "#192A60",
    borderWidth: 2,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    textAlign: "center",
    color: "#192A60",
    fontWeight: "bold",
  },
});
