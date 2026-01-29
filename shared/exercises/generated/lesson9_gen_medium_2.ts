import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l9-gen-med-2",
  lesson: 9,
  difficulty: "medel",
  instructions:
    "Skapa ett hälsosystem: liv=10, skada=2. Loopa 4 gånger och minska liv med skada. Efter varje attack, skriv ut aktuellt liv. Om liv når 0 eller mindre, skriv 'Game Over' och avsluta.",
  starterCode:
    'int liv = 10;\nint skada = 2;\nfor (int i = 0; i < 4; i++)\n{\n    liv  skada;\n    Console.WriteLine(liv);\n    if (liv  0)\n    {\n        Console.WriteLine("Game Over");\n        break;\n    }\n}',
  expectedOutput: "8\n6\n4\n2",
  hint: "Använd -= för skada och <= för att kolla om liv är slut",
  tag: "Spellogik",
};
