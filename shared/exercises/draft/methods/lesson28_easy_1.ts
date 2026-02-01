import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l28-latt-1",
  lesson: 28,
  difficulty: "lätt",
  instructions: "Grundläggande return true;. Fixa koden.",
  starterCode: `bool IsDead() { return hp <= 0; }`,
  expectedOutput: `Correct`,
  hints: ["Läs instruktionen"],
  tag: "ReturnBool",
};
