import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l38-medel-1",
  lesson: 38,
  difficulty: "medel",
  instructions: "Mer avancerad list[0]. Använd \"citat\" här.",
  starterCode: `string first = list[0];
// Fixa logiken`,
  expectedOutput: `Correct`,
  hints: ["Tänk på logiken"],
  tag: "ListIndex",
};
