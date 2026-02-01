import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l16-medel-1",
  lesson: 16,
  difficulty: "medel",
  instructions: "Mer avancerad if (x > 0). Använd \"citat\" här.",
  starterCode: `if (hp < 10) {}
// Fixa logiken`,
  expectedOutput: `Correct`,
  hints: ["Tänk på logiken"],
  tag: "If",
};
