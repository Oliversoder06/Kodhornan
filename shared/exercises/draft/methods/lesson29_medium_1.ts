import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l29-medel-1",
  lesson: 29,
  difficulty: "medel",
  instructions: "Mer avancerad { int local = 5; }. Använd \"citat\" här.",
  starterCode: `void Test() { int x = 1; }
// Fixa logiken`,
  expectedOutput: `Correct`,
  hints: ["Tänk på logiken"],
  tag: "Scope",
};
