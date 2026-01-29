import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l7-medium-1",
  lesson: 7,
  difficulty: "medel",
  instructions:
    "Loopa från 1 till 10. Skriv ut 'Hittat!' när du når talet 5 och avsluta sedan loopen.",
  starterCode:
    'for (int i = 1; i <= 10; i++)\n{\n    if (i  5)\n    {\n        Console.WriteLine("Hittat!");\n        break;\n    }\n}',
  expectedOutput: "Hittat!",
  hint: "Använd == för jämförelse och break för att avsluta loopen",
  tag: "Kombinerad Logik",
};
