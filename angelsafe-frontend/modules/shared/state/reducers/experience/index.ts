import { getTomorrowEpoch } from "@/shared/utils/getTomorrowEpoch";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum Moods {
  HAPPY = "Happy",
  CALM = "Calm",
  SAD = "Sad",
  SICK = "Sick",
  ANGRY = "Angry",
}

type MoodAndSymptomsType = {
  mood: Moods | undefined;
  symptoms: string[];
  lastSubmitted: number;
  isEditableToday: boolean;
  tomorrowsEpoch: number;
};

const initialState: MoodAndSymptomsType = {
  mood: undefined,
  symptoms: [],
  lastSubmitted: 0,
  isEditableToday: true,
  tomorrowsEpoch: 0,
};

const themeSlice = createSlice({
  name: "experience",
  initialState,
  reducers: {
    setMood: (state, action: PayloadAction<Moods>) => {
      state.mood = action.payload;
      state.lastSubmitted = 0;
    },
    setSymptoms: (state, action: PayloadAction<string>) => {
      if (!!state.symptoms.length) {
        if (state.symptoms.includes(action.payload)) {
          state.symptoms = state.symptoms.filter((i) => i !== action.payload);
        } else {
          state.symptoms = [...state.symptoms, action.payload];
        }
      } else {
        state.symptoms = [action.payload];
      }
      state.lastSubmitted = 0;
    },
    setLastSubmitted: (state, action: PayloadAction<number>) => {
      state.lastSubmitted = action.payload;
      state.isEditableToday = false;
      state.tomorrowsEpoch = getTomorrowEpoch();
    },
    enableEditToday: (state) => {
      state.isEditableToday = true;
    },
  },
});

export default themeSlice.reducer;
export const { setMood, setSymptoms, setLastSubmitted, enableEditToday } =
  themeSlice.actions;
