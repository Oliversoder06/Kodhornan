import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l28-medel-1",
  lesson: 28,
  difficulty: "medel",
  instructions: "Mer avancerad return true;. Använd \"citat\" här.",
  starterCode: `bool IsDead() { return hp <= 0; }
// Fixa logiken`,
  expectedOutput: `Correct`,
  hints: ["Tänk på logiken"],
  tag: "ReturnBool",
};
