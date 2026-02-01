import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l13-medel-1",
  lesson: 13,
  difficulty: "medel",
  instructions: "Mer avancerad new Random(). Använd \"citat\" här.",
  starterCode: `Random r = new Random();
// Fixa logiken`,
  expectedOutput: `Correct`,
  hints: ["Tänk på logiken"],
  tag: "Random",
};
