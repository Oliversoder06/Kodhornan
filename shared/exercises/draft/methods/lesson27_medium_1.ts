import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l27-medel-1",
  lesson: 27,
  difficulty: "medel",
  instructions: "Mer avancerad return 5;. Använd \"citat\" här.",
  starterCode: `int GetScore() { return 100; }
// Fixa logiken`,
  expectedOutput: `Correct`,
  hints: ["Tänk på logiken"],
  tag: "ReturnInt",
};
