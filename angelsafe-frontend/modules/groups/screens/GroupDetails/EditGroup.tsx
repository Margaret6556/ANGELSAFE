import { Animated, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Button,
  Input,
  makeStyles,
  Text,
  useTheme,
} from "@rneui/themed";
import { StackScreenProps } from "@react-navigation/stack";
import { GroupDetailsParamList } from "@/groups/types";
import GroupDetailHeader from "@/groups/components/Header/GroupDetailHeader";
import { Container } from "@/shared/components";
import { Controller, useForm } from "react-hook-form";
import UpdateGroupPhoto from "@/groups/components/Groups/UpdateGroupPhoto";
import { sizing } from "@/shared/providers/ThemeProvider";

type FieldType = {
  description: string;
};

const MAX_LENGTH = 200;

const EditGroup = (
  props: StackScreenProps<GroupDetailsParamList, "EditGroup">
) => {
  const { groupname, profilePic, description, id } = props.route.params;
  const styles = useStyles();
  const { theme } = useTheme();
  const [multilineHeight, setMultiLineHeight] = useState(0);
  const animation = useRef(new Animated.Value(999)).current;
  const { control, handleSubmit, watch } = useForm<FieldType>({
    defaultValues: {
      description: "",
    },
  });
  const _description = watch("description");
  const handleNavigationBack = () => {
    props.navigation.goBack();
  };

  const handleDescriptionSubmit = (val: FieldType) => {};

  return (
    <>
      <GroupDetailHeader
        animation={animation}
        groupname={groupname!}
        profilePic={profilePic!}
        onNavigationBack={handleNavigationBack}
      />
      <Container containerProps={{ style: styles.container }}>
        <View style={styles.top}>
          <Controller
            control={control}
            name="description"
            rules={{
              required: {
                message: "Please enter a description",
                value: true,
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <Input
                multiline
                label={
                  <View style={styles.textLabelContainer}>
                    <Text style={styles.textDescription}>
                      Update Group Description
                    </Text>
                    <Text style={styles.textLength}>
                      {_description.length}/{MAX_LENGTH}
                    </Text>
                  </View>
                }
                placeholder={description}
                errorMessage={error?.message}
                style={{ height: Math.max(100, multilineHeight) }}
                maxLength={MAX_LENGTH}
                onContentSizeChange={(event) => {
                  setMultiLineHeight(event.nativeEvent.contentSize.height);
                }}
                disabled
                {...field}
                onChangeText={field.onChange}
              />
            )}
          />
          <Button
            containerStyle={{ width: "100%" }}
            title="Update"
            onPress={handleSubmit(handleDescriptionSubmit)}
            disabled
          />
        </View>
        <View style={styles.photoContainer}>
          <Text
            style={[
              styles.textDescription,
              {
                marginBottom: theme.spacing.sm,
              },
            ]}
          >
            Update Group Photo
          </Text>
          <UpdateGroupPhoto groupId={id!} profilePic={profilePic!} />
        </View>
      </Container>
    </>
  );
};

export default EditGroup;

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  top: {
    marginBottom: theme.spacing.xl,
    width: "100%",
  },
  photoContainer: {
    paddingVertical: theme.spacing.lg,
  },
  textLabelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: theme.spacing.lg,
  },
  textDescription: {
    color: theme.colors.primary,
  },
  textLength: {
    fontSize: sizing.FONT.xs,
    color: theme.colors.grey1,
  },
  wrapper: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
}));
