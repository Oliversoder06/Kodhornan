import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l9-medium-1",
  lesson: 9,
  difficulty: "medel",
  instructions:
    "Simulera en enkel spelloop. Skapa liv=3 och skada=1. Använd en loop som kör 3 gånger och minskar liv med skada varje gång. Skriv ut liv efter varje iteration.",
  starterCode:
    "int liv = 3;\nint skada = 1;\n\nfor (int i = 0; i < 3; i++)\n{\n    liv  skada;\n    Console.WriteLine(liv);\n}",
  expectedOutput: "2\n1\n0",
  hint: "Använd -= för att minska liv",
  tag: "Spellogik",
};
