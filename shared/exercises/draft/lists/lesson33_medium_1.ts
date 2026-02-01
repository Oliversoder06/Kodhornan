import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l33-medel-1",
  lesson: 33,
  difficulty: "medel",
  instructions: "Mer avancerad .Add(). Använd \"citat\" här.",
  starterCode: `bag.Add("Item");
// Fixa logiken`,
  expectedOutput: `Correct`,
  hints: ["Tänk på logiken"],
  tag: "ListAdd",
};
