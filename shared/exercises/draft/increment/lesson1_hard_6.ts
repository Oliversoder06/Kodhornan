import type { Exercise } from "../../../exercise.schema";

export const exercise: Exercise = {
  id: "l1-svar-6",
  lesson: 1,
  difficulty: "svår",
  instructions: "Utmaning med x++.",
  starterCode: `int x = 0; x++;
// Gör det svårare`,
  expectedOutput: `Correct`,
  hints: ["Klarar du detta?"],
  tag: "Increment",
};
