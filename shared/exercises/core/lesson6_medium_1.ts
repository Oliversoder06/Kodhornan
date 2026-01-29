import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l6-medium-1",
  lesson: 6,
  difficulty: "medel",
  instructions:
    "Använd en for-loop för att räkna från 1 till 5 och skriv ut varje tal.",
  starterCode: "for (int i = ; i  ; i++)\n{\n    Console.WriteLine(i);\n}",
  expectedOutput: "1\n2\n3\n4\n5",
  hint: "Börja på 1 och loopa till och med 5",
  tag: "Loopar",
};
