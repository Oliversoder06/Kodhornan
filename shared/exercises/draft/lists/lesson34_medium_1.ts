import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l34-medel-1",
  lesson: 34,
  difficulty: "medel",
  instructions: "Mer avancerad .Count. Använd \"citat\" här.",
  starterCode: `int c = bag.Count;
// Fixa logiken`,
  expectedOutput: `Correct`,
  hints: ["Tänk på logiken"],
  tag: "ListCount",
};
