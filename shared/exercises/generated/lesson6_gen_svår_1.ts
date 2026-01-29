import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l6-gen-svår-1",
  lesson: 6,
  difficulty: "svår",
  instructions:
    "Använd en for-loop för att skriva ut multiplikationstabellen för 5 (5, 10, 15, 20, 25, 30, 35, 40, 45, 50).",
  starterCode: "for (int i = ; i  ; i++)\n{\n    Console.WriteLine(i  5);\n}",
  expectedOutput: "5\n10\n15\n20\n25\n30\n35\n40\n45\n50",
  hint: "Loopa från 1 till 10 och skriv ut i * 5",
  tag: "Loopar",
};
