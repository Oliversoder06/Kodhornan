import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l9-svar-1",
  lesson: 9,
  difficulty: "svår",
  instructions: "Genomsnittlig level.",
  starterCode: `int lvl1 = 10;
int lvl2 = 20;
int avg = (lvl1 + lvl2) ___ 2;
Console.WriteLine(avg);`,
  expectedOutput: `15`,
  hints: ["Dela summan med 2"],
  tag: "Matte",
};
