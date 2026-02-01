import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l43-medel-1",
  lesson: 43,
  difficulty: "medel",
  instructions: "Mer avancerad p.Run(). Använd \"citat\" här.",
  starterCode: `class P { void Run() {} }
// Fixa logiken`,
  expectedOutput: `Correct`,
  hints: ["Tänk på logiken"],
  tag: "MethodsClass",
};
