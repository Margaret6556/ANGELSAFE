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
  initialSymptoms: string[];
  additionalSymptoms: string[];
  lastSubmitted: number;
  isEditableToday: boolean;
  tomorrowsEpoch: number;
  hasCancelled: boolean;
};

const initialState: MoodAndSymptomsType = {
  mood: undefined,
  symptoms: [],
  additionalSymptoms: [
    "Tiredness",
    "Morning sickness",
    "Pain",
    "Weightloss",
    "Diarrhea",
  ],
  initialSymptoms: [
    "Anxiety",
    "Panic attacks",
    "Fatigue",
    "Nausea",
    "Difficulty of Breathing",
  ],
  lastSubmitted: 0,
  isEditableToday: true,
  tomorrowsEpoch: 0,
  hasCancelled: false,
};

const themeSlice = createSlice({
  name: "experience",
  initialState,
  reducers: {
    setMood: (state, action: PayloadAction<Moods>) => {
      state.mood = action.payload;
      state.lastSubmitted = 0;
    },
    setInitialSymptoms: (state, action: PayloadAction<string>) => {
      let arr = [...state.initialSymptoms, action.payload];
      if (state.initialSymptoms.includes(action.payload)) {
        arr = arr.filter((i) => i !== action.payload);
      }

      state.initialSymptoms = arr;
    },
    setAdditionalSymptoms: (state, action: PayloadAction<string>) => {
      state.additionalSymptoms = [action.payload, ...state.additionalSymptoms];
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
      state.hasCancelled = false;
    },
    setHasCancelled: (state) => {
      state.hasCancelled = true;
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
export const {
  setMood,
  setSymptoms,
  setLastSubmitted,
  enableEditToday,
  setInitialSymptoms,
  setAdditionalSymptoms,
  setHasCancelled,
} = themeSlice.actions;
