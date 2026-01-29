import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l7-gen-med-2",
  lesson: 7,
  difficulty: "medel",
  instructions:
    "Loopa från 1 till 10. Om talet är delbart med 3, skriv ut talet. Annars fortsätt till nästa.",
  starterCode:
    "for (int i = 1; i <= 10; i++)\n{\n    if (i % 3  0)\n    {\n        Console.WriteLine(i);\n    }\n}",
  expectedOutput: "3\n6\n9",
  hint: "Använd % 3 == 0 för att kolla om delbart med 3",
  tag: "Kombinerad Logik",
};
