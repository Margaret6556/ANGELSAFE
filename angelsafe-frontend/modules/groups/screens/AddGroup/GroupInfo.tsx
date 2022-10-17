import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { AddGroupParamList } from "../../types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StyleConstants } from "@/shared/styles";
import { Input, Button, Text } from "@rneui/themed";
import { Controller, useForm } from "react-hook-form";
import useAxios from "@/shared/hooks/useAxios";
import { _API } from "@/shared/config";
import axios from "axios";
import { BackendResponse } from "@/shared/types";
import { useKeyboardShowing } from "@/shared/hooks";

type FieldsType = {
  groupname: string;
  description: string;
};

const AddGroup = ({
  navigation,
}: StackScreenProps<AddGroupParamList, "GroupInfo">) => {
  const [multilineHeight, setMultiLineHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { keyboardIsShowing } = useKeyboardShowing();

  const ax = useAxios();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { groupname: "", description: "" },
  });

  const handleAddGroup = async (val: FieldsType) => {
    setIsLoading(true);
    try {
      const { data } = await ax.post<
        BackendResponse<BackendResponse<{ message: string }>>
      >(_API.GROUP.REGISTER, val);
      console.log({ data });
      if (data.status === 200) {
        console.log("success");
        navigation.push("GroupPhoto", {
          id: "634d84769320223f24cf1e0a", // TODO
        });
      }
      // navigation.push("GroupPhoto", {
      //   // id: "634d8f929320223f24cf27a5", // TODO
      //   id: "634d84769320223f24cf1e0a", // TODO
      // });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setError(e.response?.data.message);
        console.log({ e: e.message });
      }
    }
    setIsLoading(false);
  };

  return (
    <KeyboardAwareScrollView
      scrollEnabled={keyboardIsShowing}
      contentContainerStyle={styles.wrapper}
    >
      <View style={styles.inputs}>
        <Text style={{ color: error ? "red" : "transparent", height: 24 }}>
          {error}
        </Text>
        <Controller
          control={control}
          name="groupname"
          render={({ field }) => (
            <Input
              label="Enter Group Name"
              {...field}
              onChangeText={field.onChange}
              labelStyle={{ fontSize: 16 }}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Input
              label="Enter Group Description"
              multiline
              inputStyle={{
                height: Math.max(100, multilineHeight),
              }}
              {...field}
              onContentSizeChange={(event) => {
                setMultiLineHeight(event.nativeEvent.contentSize.height);
              }}
              onChangeText={field.onChange}
              labelStyle={{ fontSize: 16 }}
            />
          )}
        />
      </View>
      <Button
        title="Add Group"
        onPress={handleSubmit(handleAddGroup)}
        loading={isLoading}
      />
    </KeyboardAwareScrollView>
  );
};

export default AddGroup;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: StyleConstants.PADDING_HORIZONTAL,
    justifyContent: "space-between",
  },
  inputs: {},
});
