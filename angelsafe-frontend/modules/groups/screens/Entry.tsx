import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Container, Loading } from "@/shared/components";
import { GroupParamsList, GroupsType } from "../types";
import Groups from "../components/Groups";
import { StackScreenProps } from "@react-navigation/stack";
import { _API } from "@/shared/config";
import useAxios from "@/shared/hooks/useAxios";
import { BackendResponse } from "@/shared/types";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import SessionManager from "@/shared/utils/auth/SessionManager";

const EntryScreen = ({
  navigation,
}: StackScreenProps<GroupParamsList, "Entry">) => {
  const [groups, setGroups] = useState<GroupsType[]>([]);
  const isFocused = useIsFocused();

  const api = useAxios();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const {
          data: { data, status },
        } = await axios.get<BackendResponse<GroupsType[]>>(_API.GROUP.LIST, {
          headers: await SessionManager.setHeader(),
        });
        if (status === 200) {
          console.log(data.length, "Running");
          setGroups(data);
        }
      } catch (e) {
        if (axios.isAxiosError(e)) {
          console.log({ e });
          console.log({ e: e.message, f: e.response?.data.message });
        }
      }
    };

    if (isFocused) {
      fetchGroups();
    }
    return () => {
      console.log("?");
    };
  }, [isFocused]);

  return (
    <>
      {groups.length > 0 ? (
        <Container
          containerProps={{
            style: styles.wrapper,
          }}
        >
          <Groups data={groups} />
        </Container>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default EntryScreen;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "flex-start",
    paddingVertical: 0,
  },
});
