import { Moods } from "@/shared/state/reducers/experience";
import { MoodsType } from "../types";

// export const initialSymptoms = [
//   "Anxiety",
//   "Panic attacks",
//   "Fatigue",
//   "Nausea",
//   "Difficulty of Breathing",
// ];

// export const additionalSymptoms = [
//   {
//     title: "Add Symptoms",
//     data: ["Tiredness", "Morning sickness", "Pain", "Weightloss", "Diarrhea"],
//   },
// ];

export const moods: MoodsType[] = [
  {
    id: "1",
    label: Moods.HAPPY,
    image: require("../../../assets/home/mood/happy.png"),
  },
  {
    id: "2",
    label: Moods.CALM,
    image: require("../../../assets/home/mood/calm.png"),
  },
  {
    id: "3",
    label: Moods.SAD,
    image: require("../../../assets/home/mood/sad.png"),
  },
  {
    id: "4",
    label: Moods.SICK,
    image: require("../../../assets/home/mood/annoyed.png"),
  },
  {
    id: "5",
    label: Moods.ANGRY,
    image: require("../../../assets/home/mood/angry.png"),
  },
];
