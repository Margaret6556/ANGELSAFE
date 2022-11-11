import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Container, ErrorText, Loading } from "@/shared/components";
import { GroupParamsList } from "../types";
import Groups from "../components/Groups";
import { StackScreenProps } from "@react-navigation/stack";
import { _API } from "@/shared/config";
import { useGetGroupsQuery } from "@/shared/api/groups";
import SearchModal from "../components/SearchModal";
import { useGroupsContext } from "../components/GroupsContext";

const EntryScreen = ({}: StackScreenProps<GroupParamsList, "Entry">) => {
  const { data, isError, error } = useGetGroupsQuery();
  const { searchModalVisible, handleToggleSearchModal } = useGroupsContext();

  if (isError || error) {
    return <ErrorText />;
  }

  if (data) {
    const groupNames = data.data.map(({ groupname, id }) => ({
      groupname,
      id,
    }));

    return (
      <>
        <Container
          containerProps={{
            style: styles.wrapper,
          }}
        >
          <Groups data={data.data} />
        </Container>
        <SearchModal
          isVisible={searchModalVisible}
          onCancel={handleToggleSearchModal}
          groups={groupNames}
        />
      </>
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
