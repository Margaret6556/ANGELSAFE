import { Moods } from "@/shared/state/reducers/experience";
import { MoodsType } from "../types";

export const initialSymptoms = [
  "Tiredness",
  "Morning sickness",
  "Anxiety",
  "Panic attacks",
  "Pain",
  "Fatigue",
  "Nausea",
  "Weightloss",
  "Diarrhea",
];

export const moods: MoodsType[] = [
  {
    id: "0",
    label: Moods.HAPPY,
    image: require("../../../assets/home/mood/happy.png"),
  },
  {
    id: "1",
    label: Moods.CALM,
    image: require("../../../assets/home/mood/calm.png"),
  },
  {
    id: "2",
    label: Moods.SAD,
    image: require("../../../assets/home/mood/sad.png"),
  },
  {
    id: "3",
    label: Moods.SICK,
    image: require("../../../assets/home/mood/annoyed.png"),
  },
  {
    id: "4",
    label: Moods.ANGRY,
    image: require("../../../assets/home/mood/angry.png"),
  },
];
