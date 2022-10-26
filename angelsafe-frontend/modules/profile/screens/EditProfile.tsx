import { Alert, Keyboard, Pressable, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { ProfileParamsList } from "../types";
import { Container } from "@/shared/components";
import useChangeTopBarBg from "@/shared/hooks/useChangeTopBarBg";
import { Button, Divider, Input, Text } from "@rneui/themed";
import { Controller, useForm } from "react-hook-form";
import DropDownPicker from "react-native-dropdown-picker";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { useUpdateProfileMutation } from "@/shared/api/profile";
import { BackendErrorResponse, BackendResponse } from "@/shared/types";
import useSetSolidBackground from "@/shared/hooks/useSetSolidBackground";
import { setUser } from "@/shared/state/reducers/auth";

type FieldsType = {
  bio: string;
};

const bioMaxLength = 150;

const EditProfile = ({}: StackScreenProps<
  ProfileParamsList,
  "Edit Profile"
>) => {
  useSetSolidBackground();
  const [multilineHeight, setMultiLineHeight] = useState(0);
  const [updateProfile, updateProfileResponse] = useUpdateProfileMutation();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setError,
  } = useForm({
    defaultValues: {
      bio: "",
    },
  });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);

  const biography = watch("bio");
  const handleEditProfile = async (val: FieldsType) => {
    try {
      console.log({ val });
      const { data, status } = await updateProfile(val).unwrap();

      if (status === 200) {
        showAlert();
        dispatch(setUser({ bio: biography }));
      }
    } catch (e) {
      const err = e as BackendResponse<BackendErrorResponse>;
      setError("bio", {
        type: "value",
        message: err.data.message,
      });
      console.log({ err });
    }
  };

  const showAlert = () => {
    Alert.alert("Success", undefined, [
      {
        onPress: () => console.log(123),
      },
    ]);
  };

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <Container
        type="image"
        containerProps={{
          style: styles.container,
        }}
      >
        <Controller
          name="bio"
          control={control}
          rules={{
            minLength: {
              value: 2,
              message: "Minimum of 2 characters",
            },
          }}
          render={({ field }) => (
            <View style={{ width: "100%" }}>
              <Input
                label="Enter Biography"
                multiline
                inputStyle={{
                  height: Math.max(100, multilineHeight),
                }}
                errorStyle={{ textAlign: "right" }}
                errorMessage={errors.bio?.message}
                {...field}
                onContentSizeChange={(event) => {
                  setMultiLineHeight(event.nativeEvent.contentSize.height);
                }}
                onChangeText={field.onChange}
                labelStyle={{ fontSize: 16 }}
                maxLength={bioMaxLength}
                placeholder={user?.bio}
              />
              <View>
                <Text style={styles.bioLength}>
                  {biography.length}/{bioMaxLength}
                </Text>
              </View>
            </View>
          )}
        />

        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          listMode="SCROLLVIEW"
        />
        <Button
          containerStyle={styles.button}
          title="Submit"
          onPress={handleSubmit(handleEditProfile)}
          loading={updateProfileResponse.isLoading}
        />
      </Container>
    </Pressable>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
  },
  bioLength: {
    textAlign: "right",
    fontSize: 12,
    color: "#666",
  },
  button: {
    width: "100%",
  },
});
