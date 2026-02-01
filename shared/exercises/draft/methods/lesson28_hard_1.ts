import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l28-svar-1",
  lesson: 28,
  difficulty: "svår",
  instructions: "Utmaning med return true;.",
  starterCode: `bool IsDead() { return hp <= 0; }
// Gör det svårare`,
  expectedOutput: `Correct`,
  hints: ["Klarar du detta?"],
  tag: "ReturnBool",
};
