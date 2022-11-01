import { apiSlice } from ".";
import { _API } from "../config";
import { BackendResponse } from "../types";

export interface NotificationResponse {
  timestamp: number;
  message: string;
  read: number;
  profilePic: string;
  groupname: string;
  groupId: string;
}

const notificationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotificationsList: builder.query<
      BackendResponse<NotificationResponse[]>,
      void
    >({
      query: () => _API.NOTIFICATIONS.LIST,
      providesTags: ["NOTIFICATIONS"]
    }),
  }),
  overrideExisting: true,
});

export const { useGetNotificationsListQuery } = notificationsApiSlice;
