import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l12-medel-1",
  lesson: 12,
  difficulty: "medel",
  instructions: "Mer avancerad int.Parse. Använd \"citat\" här.",
  starterCode: `int num = int.Parse("10");
// Fixa logiken`,
  expectedOutput: `Correct`,
  hints: ["Tänk på logiken"],
  tag: "Parse",
};
