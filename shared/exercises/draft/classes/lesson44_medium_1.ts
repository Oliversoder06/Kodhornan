import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l44-medel-1",
  lesson: 44,
  difficulty: "medel",
  instructions: "Mer avancerad public Player(). Använd \"citat\" här.",
  starterCode: `public Player() { hp = 100; }
// Fixa logiken`,
  expectedOutput: `Correct`,
  hints: ["Tänk på logiken"],
  tag: "Constructor",
};
