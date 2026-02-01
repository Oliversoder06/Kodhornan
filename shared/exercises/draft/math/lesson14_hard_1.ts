import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l14-svar-1",
  lesson: 14,
  difficulty: "svår",
  instructions: "Utmaning med %.",
  starterCode: `int rest = 10 % 3;
// Gör det svårare`,
  expectedOutput: `Correct`,
  hints: ["Klarar du detta?"],
  tag: "Modulo",
};
