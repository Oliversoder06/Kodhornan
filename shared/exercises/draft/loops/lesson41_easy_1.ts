import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l41-latt-1",
  lesson: 41,
  difficulty: "lätt",
  instructions: "Grundläggande for(int i=0...). Fixa koden.",
  starterCode: `for(int i=0; i<5; i++) {}`,
  expectedOutput: `Correct`,
  hints: ["Läs instruktionen"],
  tag: "ForLoop",
};
