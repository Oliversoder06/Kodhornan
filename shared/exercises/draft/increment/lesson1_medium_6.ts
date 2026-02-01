import type { Exercise } from "../../../exercise.schema";

export const exercise: Exercise = {
  id: "l1-medel-6",
  lesson: 1,
  difficulty: "medel",
  instructions: 'Mer avancerad x++. Använd "citat" här.',
  starterCode: `int x = 0; x++;
// Fixa logiken`,
  expectedOutput: `Correct`,
  hints: ["Tänk på logiken"],
  tag: "Increment",
};
