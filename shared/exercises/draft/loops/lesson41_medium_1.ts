import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l41-medel-1",
  lesson: 41,
  difficulty: "medel",
  instructions: "Mer avancerad for(int i=0...). Använd \"citat\" här.",
  starterCode: `for(int i=0; i<5; i++) {}
// Fixa logiken`,
  expectedOutput: `Correct`,
  hints: ["Tänk på logiken"],
  tag: "ForLoop",
};
