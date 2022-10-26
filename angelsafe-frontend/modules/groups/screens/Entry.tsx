import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Container, Loading } from "@/shared/components";
import { GroupParamsList } from "../types";
import Groups from "../components/Groups";
import { StackScreenProps } from "@react-navigation/stack";
import { _API } from "@/shared/config";
import { useGetGroupsQuery } from "@/shared/api/groups";
import { Text } from "@rneui/themed";

const EntryScreen = ({
  navigation,
}: StackScreenProps<GroupParamsList, "Entry">) => {
  // const isFocused = useIsFocused();
  const { data, isLoading, isError, error } = useGetGroupsQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    if ("status" in error) {
      console.log(error.data.message);
    }
  }

  if (data) {
    return (
      <Container
        containerProps={{
          style: styles.wrapper,
        }}
      >
        <Groups data={data.data} />
      </Container>
    );
  }

  return (
    <Container>
      <Text style={{ color: "red" }}>Error</Text>
    </Container>
  );
};

export default EntryScreen;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "flex-start",
    paddingVertical: 0,
  },
});
