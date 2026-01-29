import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l7-medium-2",
  lesson: 7,
  difficulty: "medel",
  instructions:
    "Räkna från 1 till 5. För varje tal, om det är större än 3, skriv 'Stort', annars skriv 'Litet'.",
  starterCode:
    'for (int i = 1; i <= 5; i++)\n{\n    if (i  3)\n    {\n        Console.WriteLine("Stort");\n    }\n    else\n    {\n        Console.WriteLine("Litet");\n    }\n}',
  expectedOutput: "Litet\nLitet\nLitet\nStort\nStort",
  hint: "Använd > för att jämföra med 3",
  tag: "Kombinerad Logik",
};
