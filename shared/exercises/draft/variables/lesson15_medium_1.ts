import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l15-medel-1",
  lesson: 15,
  difficulty: "medel",
  instructions: "Mer avancerad x++. Använd \"citat\" här.",
  starterCode: `int x = 0; x++;
// Fixa logiken`,
  expectedOutput: `Correct`,
  hints: ["Tänk på logiken"],
  tag: "Increment",
};
