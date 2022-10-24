import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { AddGroupParamList } from "../../types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StyleConstants } from "@/shared/styles";
import { Input, Button, Text } from "@rneui/themed";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch, useKeyboardShowing } from "@/shared/hooks";
// import { BackendErrorResponse, BackendResponse } from "@/shared/types";
import { useAddGroupMutation } from "@/shared/api/groups";

type FieldsType = {
  groupname: string;
  description: string;
};

const AddGroup = ({
  navigation,
}: StackScreenProps<AddGroupParamList, "GroupInfo">) => {
  const [multilineHeight, setMultiLineHeight] = useState(0);
  const { keyboardIsShowing } = useKeyboardShowing();
  const [addGroup, addGroupResponse] = useAddGroupMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { groupname: "", description: "" },
  });

  const handleAddGroup = async (val: FieldsType) => {
    try {
      const {
        data: { groupId },
        status,
      } = await addGroup(val).unwrap();

      if (status === 200) {
        navigation.push("GroupPhoto", {
          id: groupId,
        });
      }
    } catch (e) {
      console.log({ e });
    }
  };

  return (
    <KeyboardAwareScrollView
      scrollEnabled={keyboardIsShowing}
      contentContainerStyle={styles.wrapper}
    >
      <View style={styles.inputs}>
        <Text
          style={{
            color: addGroupResponse.error ? "red" : "transparent",
            height: 24,
          }}
        >
          {addGroupResponse.error &&
            "status" in addGroupResponse.error &&
            addGroupResponse.error.data.message}
        </Text>
        <Controller
          control={control}
          name="groupname"
          rules={{
            max: 21,
          }}
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
        loading={addGroupResponse.isLoading}
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
