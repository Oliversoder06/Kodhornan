import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l40-latt-1",
  lesson: 40,
  difficulty: "lätt",
  instructions: "Grundläggande foreach. Fixa koden.",
  starterCode: `foreach(string s in list) {}`,
  expectedOutput: `Correct`,
  hints: ["Läs instruktionen"],
  tag: "Foreach",
};
