import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l15-svar-1",
  lesson: 15,
  difficulty: "svår",
  instructions: "Utmaning med x++.",
  starterCode: `int x = 0; x++;
// Gör det svårare`,
  expectedOutput: `Correct`,
  hints: ["Klarar du detta?"],
  tag: "Increment",
};
