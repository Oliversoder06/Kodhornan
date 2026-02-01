import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l40-medel-1",
  lesson: 40,
  difficulty: "medel",
  instructions: "Mer avancerad foreach. Använd \"citat\" här.",
  starterCode: `foreach(string s in list) {}
// Fixa logiken`,
  expectedOutput: `Correct`,
  hints: ["Tänk på logiken"],
  tag: "Foreach",
};
