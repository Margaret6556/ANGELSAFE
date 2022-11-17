import React, { createContext, useContext, useState } from "react";
import { ChildrenProps } from "@/shared/types";
import { GroupDetailsType, GroupsType } from "@/groups/types";

interface GroupsProviderProps extends ChildrenProps {}

type GroupsContextType = {
  searchModalVisible: boolean;
  selectedGroupDetails: GroupsType | undefined;
  handleToggleSearchModal: () => void;
  handleSetGroupDetails: (groupDetails: GroupDetailsType) => void;
};
const GroupsContext = createContext<GroupsContextType>({} as GroupsContextType);

const GroupsProvider = (props: GroupsProviderProps) => {
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [selectedGroupDetails, setSelectedGroupDetails] =
    useState<GroupsType>();

  const handleToggleSearchModal = () => {
    setSearchModalVisible(!searchModalVisible);
  };

  const handleSetGroupDetails = (groupDetails: GroupsType) => {
    setSelectedGroupDetails(groupDetails);
  };

  const value = {
    searchModalVisible,
    selectedGroupDetails,
    handleSetGroupDetails,
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
