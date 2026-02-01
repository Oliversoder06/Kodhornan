import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l34-svar-1",
  lesson: 34,
  difficulty: "svår",
  instructions: "Utmaning med .Count.",
  starterCode: `int c = bag.Count;
// Gör det svårare`,
  expectedOutput: `Correct`,
  hints: ["Klarar du detta?"],
  tag: "ListCount",
};
