import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l34-latt-1",
  lesson: 34,
  difficulty: "lätt",
  instructions: "Grundläggande .Count. Fixa koden.",
  starterCode: `int c = bag.Count;`,
  expectedOutput: `Correct`,
  hints: ["Läs instruktionen"],
  tag: "ListCount",
};
