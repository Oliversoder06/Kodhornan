import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l14-medel-1",
  lesson: 14,
  difficulty: "medel",
  instructions: "Mer avancerad %. Använd \"citat\" här.",
  starterCode: `int rest = 10 % 3;
// Fixa logiken`,
  expectedOutput: `Correct`,
  hints: ["Tänk på logiken"],
  tag: "Modulo",
};
