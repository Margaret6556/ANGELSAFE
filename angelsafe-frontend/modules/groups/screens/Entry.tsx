import React from "react";
import { StyleSheet } from "react-native";
import { Container, ErrorText, Loading } from "@/shared/components";
import { GroupParamsList } from "../types";
import Groups from "../components/Groups";
import { StackScreenProps } from "@react-navigation/stack";
import { _API } from "@/shared/config";
import { useGetGroupsQuery } from "@/shared/api/groups";

const EntryScreen = ({}: StackScreenProps<GroupParamsList, "Entry">) => {
  const { data, isError, error } = useGetGroupsQuery();

  if (isError || error) {
    return <ErrorText />;
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

  return <Loading />;
};

export default EntryScreen;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "flex-start",
    paddingVertical: 0,
  },
});
