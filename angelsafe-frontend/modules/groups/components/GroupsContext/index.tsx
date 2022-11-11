import React, { createContext, useContext, useState } from "react";
import { ChildrenProps } from "@/shared/types";

interface GroupsProviderProps extends ChildrenProps {}

type GroupsContextType = {
  searchModalVisible: boolean;
  handleToggleSearchModal: () => void;
};
const GroupsContext = createContext<GroupsContextType>({} as GroupsContextType);

const GroupsProvider = (props: GroupsProviderProps) => {
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const handleToggleSearchModal = () => {
    setSearchModalVisible(!searchModalVisible);
  };
  const value = {
    searchModalVisible,
    handleToggleSearchModal,
  };
  return (
    <GroupsContext.Provider value={value}>
      {props.children}
    </GroupsContext.Provider>
  );
};

export default GroupsProvider;
export const useGroupsContext = () => useContext(GroupsContext);
