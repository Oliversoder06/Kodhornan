import type { Exercise } from "../../../exercise.schema";

export const exercise: Exercise = {
  id: "l1-svar-5",
  lesson: 1,
  difficulty: "svår",
  instructions: "Byt värde två gånger.",
  starterCode: `int x = 1;
x = 2;
___
Console.WriteLine(x);`,
  expectedOutput: `3`,
  hints: ["Sätt x till 3"],
  tag: "Variabler",
};
