import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l15-latt-1",
  lesson: 15,
  difficulty: "lätt",
  instructions: "Grundläggande x++. Fixa koden.",
  starterCode: `int x = 0; x++;`,
  expectedOutput: `Correct`,
  hints: ["Läs instruktionen"],
  tag: "Increment",
};
