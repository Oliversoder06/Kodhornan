import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l29-svar-1",
  lesson: 29,
  difficulty: "svår",
  instructions: "Utmaning med { int local = 5; }.",
  starterCode: `void Test() { int x = 1; }
// Gör det svårare`,
  expectedOutput: `Correct`,
  hints: ["Klarar du detta?"],
  tag: "Scope",
};
