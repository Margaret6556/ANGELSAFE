import axios from "axios";
import { deleteItemAsync, getItemAsync } from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from ".";
import { useGetProfileQuery, useLazyGetProfileQuery } from "../api/profile";
import { Auth, _API } from "../config";
import { setLoggedIn, setUser } from "../state/reducers/auth";
import { BackendErrorResponse, BackendResponse } from "../types";
import logger from "../utils/logger";

type SessionStatus = "loading" | "done";

const useRestoreSession = () => {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<SessionStatus>("loading");
  const [getProfile] = useLazyGetProfileQuery();

  useEffect(() => {
    const getSession = async () => {
      try {
        const token = await getItemAsync(Auth.KEY);
        if (token) {
          logger("auth", `from restore: ${token}`);
          const { data, status } = await getProfile(`Bearer ${token}`).unwrap();
          if (status === 200) {
            dispatch(setUser({ ...data, token }));
            dispatch(setLoggedIn(true));
          }
        }
      } catch (e) {
        const err = e as BackendResponse<BackendErrorResponse>;
        await deleteItemAsync(Auth.KEY);
        logger("auth", err);
      }
      setStatus("done");
    };

    getSession();
  }, []);

  return status;
};

export default useRestoreSession;
