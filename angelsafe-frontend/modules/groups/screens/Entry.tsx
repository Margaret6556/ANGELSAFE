import React from "react";
import { _API } from "@/shared/config";
import { Container, ErrorText } from "@/shared/components";
import { GroupParamsList } from "../types";
import { makeStyles, Text } from "@rneui/themed";
import { StackScreenProps } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { useGetGroupsQuery } from "@/shared/api/groups";
import { useGroupsContext } from "../components/GroupsContext";
import SearchModal from "../components/SearchModal";
import Groups from "../components/Groups";
import GroupListPlaceholder from "../components/Skeleton/GroupListPlaceholder";

const EntryScreen = ({}: StackScreenProps<GroupParamsList, "Entry">) => {
  const styles = useStyles();
  const { data, isError, error } = useGetGroupsQuery();
  const { searchModalVisible, handleToggleSearchModal } = useGroupsContext();

  if (isError || error) {
    return <ErrorText />;
  }

  if (data) {
    const groupNames = data.data;

    return (
      <>
        <Container
          containerProps={{
            style: styles.wrapper,
          }}
        >
          {!groupNames.length ? (
            <Text style={styles.noGroupsText}>
              No groups yet, go ahead and create one!
            </Text>
          ) : (
            <Groups data={data.data} />
          )}
        </Container>
        <SearchModal
          isVisible={searchModalVisible}
          onCancel={handleToggleSearchModal}
          groups={groupNames}
        />
      </>
    );
  }

  return (
    <Container containerProps={{ style: styles.wrapper }}>
      <GroupListPlaceholder />
    </Container>
  );
};

export default EntryScreen;

const useStyles = makeStyles(({ spacing }) => ({
  wrapper: {
    justifyContent: "flex-start",
    paddingVertical: 0,
  },
  noGroupsText: {
    marginTop: spacing.xl,
  },
}));
