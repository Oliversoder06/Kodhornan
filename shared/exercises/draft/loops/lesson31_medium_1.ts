import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l31-medel-1",
  lesson: 31,
  difficulty: "medel",
  instructions: "Mer avancerad break;. Använd \"citat\" här.",
  starterCode: `while(true) { break; }
// Fixa logiken`,
  expectedOutput: `Correct`,
  hints: ["Tänk på logiken"],
  tag: "Break",
};
