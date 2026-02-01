import type { Exercise } from "../../../exercise.schema";

export const exercise: Exercise = {
  id: "l1-svar-4",
  lesson: 1,
  difficulty: "svår",
  instructions: "Addera två int-variabler i utskriften.",
  starterCode: `int a = 5;
int b = 10;
Console.WriteLine(___);`,
  expectedOutput: `15`,
  hints: ["Använd plus-tecknet"],
  tag: "Variabler",
};
