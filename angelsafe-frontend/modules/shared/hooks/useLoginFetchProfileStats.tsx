import { useCallback } from "react";
import { moods } from "@/home/data";
import { setItemAsync } from "expo-secure-store";
import { useAppDispatch, useAppSelector } from ".";
import { useLazyGetProfileQuery } from "../api/profile";
import { useLazyViewStatQuery } from "../api/stats";
import { Auth } from "../config";
import { setLoggedIn, setUser } from "../state/reducers/auth";
import {
  setInitialSymptoms,
  setLastSubmitted,
  setMood,
  setSymptoms,
} from "../state/reducers/experience";
import { BackendErrorResponse, BackendResponse } from "../types";
import logger from "../utils/logger";

const useLoginFetchProfileStats = () => {
  const { initialSymptoms } = useAppSelector((state) => state.experience);
  const dispatch = useAppDispatch();
  const [getProfile] = useLazyGetProfileQuery();
  const [getStats] = useLazyViewStatQuery();

  const loginAndFetchProfile = useCallback(async (token: string) => {
    try {
      const { data } = await getProfile(`Bearer ${token}`).unwrap();
      await setItemAsync(Auth.KEY, token);
      dispatch(setUser({ ...data, token }));
      dispatch(setLoggedIn(true));
    } catch (e) {
      const err = e as BackendResponse<BackendErrorResponse>;
      logger("auth", err);
    }

    try {
      const { data } = await getStats().unwrap();

      if (typeof data !== "undefined") {
        const { experience, stat } = data;
        const found = moods.find((i) => i.id === stat);

        if (found) {
          dispatch(setMood(found.label));
        }
        experience.forEach((i) => {
          if (!initialSymptoms.includes(i)) {
            dispatch(setInitialSymptoms(i));
          }
          dispatch(setSymptoms(i));
        });
        dispatch(setLastSubmitted(new Date().getTime()));
      }
    } catch (e) {
      const err = e as BackendResponse<BackendErrorResponse>;
      logger("profile", err);
    }
  }, []);

  return loginAndFetchProfile;
};

export default useLoginFetchProfileStats;
