import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l6-easy-1",
  lesson: 6,
  difficulty: "lätt",
  instructions: "Använd en for-loop för att skriva ut siffrorna 0 till 4.",
  starterCode: "for (int i = 0; i  5; i++)\n{\n    Console.WriteLine(i);\n}",
  expectedOutput: "0\n1\n2\n3\n4",
  hint: "Använd < för att loopa från 0 till 4",
  tag: "Loopar",
};
