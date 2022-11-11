import React, { useCallback, useEffect, useRef } from "react";
import { AuthParamList } from "@/auth/types";
import { View, StyleSheet, Animated } from "react-native";
import { Button } from "@rneui/themed";
import { Container, Logo } from "@/shared/components";
import { StackScreenProps } from "@react-navigation/stack";
import { StyleConstants } from "@/shared/styles";

const LoginScreen = ({
  navigation,
}: StackScreenProps<AuthParamList, "Entry">) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      useNativeDriver: true,
      duration: 600,
    }).start();
  }, []);

  const createAnimation = useCallback(
    (val: number) => ({
      opacity: animation,
      transform: [
        {
          translateY: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [val, 0],
          }),
        },
      ],
    }),
    []
  );

  return (
    <Container>
      <Animated.View
        style={[
          styles.imageContainer,
          {
            opacity: animation,
          },
        ]}
      >
        <Logo />
      </Animated.View>
      <View style={styles.buttonGroup}>
        <Animated.View
          style={{
            marginBottom: StyleConstants.PADDING_VERTICAL,
            ...createAnimation(100),
          }}
        >
          <Button
            title="Login"
            onPress={() => {
              navigation.push("Login");
            }}
          />
        </Animated.View>
        <Animated.View style={createAnimation(200)}>
          <Button
            title="Sign Up"
            color="#333"
            type="outline"
            onPress={() => {
              navigation.setOptions({});
              navigation.push("Register");
            }}
          />
        </Animated.View>
      </View>
    </Container>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  buttonGroup: {
    width: "100%",
    justifyContent: "space-between",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
