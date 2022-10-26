import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { AddGroupParamList } from "../../types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StyleConstants } from "@/shared/styles";
import { Input, Button, Text, useTheme } from "@rneui/themed";
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
  const { theme } = useTheme();

  const styles = makeStyles({ primary: theme.colors.primary });

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
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

  const gname = watch("groupname");
  const gdescription = watch("description");

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
            <View>
              <Input
                label={
                  <View style={styles.inputLabelContainer}>
                    <Text style={styles.inputLabel}>Enter Group Name</Text>
                    <Text
                      style={[
                        styles.inputLabel,
                        { fontSize: 14, color: "#666" },
                      ]}
                    >
                      {gname.length}/21
                    </Text>
                  </View>
                }
                maxLength={21}
                {...field}
                onChangeText={field.onChange}
                labelStyle={{ fontSize: 16 }}
              />
            </View>
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Input
              maxLength={100}
              label={
                <View style={styles.inputLabelContainer}>
                  <Text style={styles.inputLabel}>Enter Group Description</Text>
                  <Text
                    style={[styles.inputLabel, { fontSize: 14, color: "#666" }]}
                  >
                    {gdescription.length}/100
                  </Text>
                </View>
              }
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

const makeStyles = (args: any) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
      padding: StyleConstants.PADDING_HORIZONTAL,
      justifyContent: "space-between",
    },
    inputs: {},
    inputLabelContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    inputLabel: {
      color: args.primary,
    },
  });
