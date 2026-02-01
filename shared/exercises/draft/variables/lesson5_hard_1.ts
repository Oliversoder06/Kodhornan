import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l5-svar-1",
  lesson: 5,
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
