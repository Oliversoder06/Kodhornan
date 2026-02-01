import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l12-svar-1",
  lesson: 12,
  difficulty: "svår",
  instructions: "Utmaning med int.Parse.",
  starterCode: `int num = int.Parse("10");
// Gör det svårare`,
  expectedOutput: `Correct`,
  hints: ["Klarar du detta?"],
  tag: "Parse",
};
