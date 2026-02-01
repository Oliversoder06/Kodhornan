import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l42-medel-1",
  lesson: 42,
  difficulty: "medel",
  instructions: "Mer avancerad string[]. Använd \"citat\" här.",
  starterCode: `string[] arr = new string[5];
// Fixa logiken`,
  expectedOutput: `Correct`,
  hints: ["Tänk på logiken"],
  tag: "Arrays",
};
