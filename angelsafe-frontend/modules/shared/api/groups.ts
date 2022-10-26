import { apiSlice } from ".";
import { _API } from "../config";
import { BackendResponse, UserType } from "../types";

export type GroupsType = {
  description: string;
  groupname: string;
  id: string;
  profilePic: string;
};

export type GroupDetailsType = {
  members: string;
  online: number;
} & GroupsType;

const groupsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGroups: builder.query<BackendResponse<GroupsType[]>, void>({
      query: () => _API.GROUP.LIST,
      providesTags: ["GROUPS"],
    }),
    getSingleGroup: builder.query<BackendResponse<GroupDetailsType>, string>({
      query: (groupId) => ({
        url: _API.GROUP.INFO,
        method: "POST",
        body: {
          groupId,
        },
      }),
      providesTags: ["GROUPS"],
    }),
    addGroup: builder.mutation<
      BackendResponse<{ groupId: string }>,
      Pick<GroupsType, "groupname" | "description">
    >({
      query: (body) => ({
        url: _API.GROUP.REGISTER,
        method: "POST",
        body,
      }),
      invalidatesTags: ["GROUPS"],
    }),
    updateGroupPhoto: builder.mutation<
      BackendResponse<{}>,
      { profilePic: string; groupId: string }
    >({
      query: (body) => ({
        url: _API.GROUP.UPDATE_PIC,
        method: "POST",
        body,
      }),
      invalidatesTags: ["GROUPS"],
    }),
    joinGroup: builder.mutation<BackendResponse<{}>, { groupId: string }>({
      query: (body) => ({
        url: _API.GROUP.JOIN,
        method: "POST",
        body,
      }),
      invalidatesTags: ["GROUPS"],
    }),
    unjoinGroup: builder.mutation<BackendResponse<{}>, { groupId: string }>({
      query: (body) => ({
        url: _API.GROUP.UNJOIN,
        method: "POST",
        body,
      }),
      invalidatesTags: ["GROUPS"],
    }),
    getGroupMembers: builder.query<
      BackendResponse<Array<UserType>>,
      { groupId: string }
    >({
      query: (body) => ({
        url: _API.GROUP.MEMBERS,
        method: "POST",
        body,
      }),
      providesTags: ["GROUPS"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetGroupsQuery,
  useGetSingleGroupQuery,
  useAddGroupMutation,
  useUpdateGroupPhotoMutation,
  useJoinGroupMutation,
  useUnjoinGroupMutation,
  useGetGroupMembersQuery,
} = groupsApiSlice;
