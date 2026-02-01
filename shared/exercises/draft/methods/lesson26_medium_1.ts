import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l26-medel-1",
  lesson: 26,
  difficulty: "medel",
  instructions: "Mer avancerad void Func(int x, int y). Använd \"citat\" här.",
  starterCode: `void Move(int x, int y) { }
// Fixa logiken`,
  expectedOutput: `Correct`,
  hints: ["Tänk på logiken"],
  tag: "MultiParams",
};
