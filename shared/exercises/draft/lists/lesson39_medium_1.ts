import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l39-medel-1",
  lesson: 39,
  difficulty: "medel",
  instructions: "Mer avancerad .Remove(). Använd \"citat\" här.",
  starterCode: `list.Remove("Item");
// Fixa logiken`,
  expectedOutput: `Correct`,
  hints: ["Tänk på logiken"],
  tag: "ListRemove",
};
