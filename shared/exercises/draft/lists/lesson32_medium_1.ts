import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l32-medel-1",
  lesson: 32,
  difficulty: "medel",
  instructions: "Mer avancerad List<string>. Använd \"citat\" här.",
  starterCode: `List<string> bag = new List<string>();
// Fixa logiken`,
  expectedOutput: `Correct`,
  hints: ["Tänk på logiken"],
  tag: "Lists",
};
