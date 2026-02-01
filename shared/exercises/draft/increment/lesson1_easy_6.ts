import type { Exercise } from "../../../exercise.schema";

export const exercise: Exercise = {
  id: "l1-latt-6",
  lesson: 1,
  difficulty: "lätt",
  instructions: "Grundläggande x++. Fixa koden.",
  starterCode: `int x = 0; x++;`,
  expectedOutput: `Correct`,
  hints: ["Läs instruktionen"],
  tag: "Increment",
};
