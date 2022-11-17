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
  joined: 0 | 1;
  ownerId: string;
} & GroupsType;

const groupsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGroups: builder.query<BackendResponse<GroupsType[]>, void>({
      query: () => ({
        url: _API.GROUP.LIST,
        method: "POST",
      }),
      providesTags: (res) => {
        const tag = { type: "GROUPS" as const, id: "LIST" };
        if (res?.data) {
          return [
            ...res.data.map(({ id }) => ({
              type: "GROUPS" as const,
              id,
            })),
            tag,
          ];
        }
        return [tag];
      },
    }),
    getSingleGroup: builder.query<BackendResponse<GroupDetailsType>, string>({
      query: (groupId) => ({
        url: _API.GROUP.INFO,
        method: "POST",
        body: {
          groupId,
        },
      }),
      providesTags: (_, __, arg) => [{ type: "GROUPS", id: arg }],
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
      providesTags: (_, __, arg) => [{ type: "GROUPS", id: arg.groupId }],
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
      invalidatesTags: [{ type: "GROUPS", id: "LIST" }, "NOTIFICATIONS"],
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
      invalidatesTags: (_, __, arg) => [{ type: "GROUPS", id: arg.groupId }],
    }),
    joinGroup: builder.mutation<BackendResponse<{}>, { groupId: string }>({
      query: (body) => ({
        url: _API.GROUP.JOIN,
        method: "POST",
        body,
      }),
      invalidatesTags: (_, __, arg) => [{ type: "GROUPS", id: arg.groupId }],
    }),
    unjoinGroup: builder.mutation<BackendResponse<{}>, { groupId: string }>({
      query: (body) => ({
        url: _API.GROUP.UNJOIN,
        method: "POST",
        body,
      }),
      invalidatesTags: (_, __, arg) => [{ type: "GROUPS", id: arg.groupId }],
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
  useLazyGetSingleGroupQuery,
} = groupsApiSlice;
