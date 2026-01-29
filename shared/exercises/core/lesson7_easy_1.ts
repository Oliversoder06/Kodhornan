import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l7-easy-1",
  lesson: 7,
  difficulty: "lätt",
  instructions:
    "Använd en for-loop och en if-sats för att skriva ut 'Jämnt' för alla jämna tal från 0 till 4.",
  starterCode:
    'for (int i = 0; i < 5; i++)\n{\n    if (i % 2  0)\n    {\n        Console.WriteLine("Jämnt");\n    }\n}',
  expectedOutput: "Jämnt\nJämnt\nJämnt",
  hint: "Använd % 2 == 0 för att kolla om ett tal är jämnt",
  tag: "Kombinerad Logik",
};
