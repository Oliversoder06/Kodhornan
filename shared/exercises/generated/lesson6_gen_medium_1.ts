import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l6-gen-med-1",
  lesson: 6,
  difficulty: "medel",
  instructions:
    "Använd en for-loop för att räkna från 10 till 1 (baklänges) och skriv ut varje tal.",
  starterCode: "for (int i = ; i  ; i--)\n{\n    Console.WriteLine(i);\n}",
  expectedOutput: "10\n9\n8\n7\n6\n5\n4\n3\n2\n1",
  hint: "Börja på 10, använd >= 1 och minska med i--",
  tag: "Loopar",
};
