import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l5-medium-1",
  lesson: 5,
  difficulty: "medel",
  instructions:
    "Skapa en bool 'hasWon' med värdet true. Använd if/else för att skriva 'Vinst!' om true, annars 'Försök igen!'.",
  starterCode:
    'bool hasWon = ;\nif (hasWon)\n{\n    Console.WriteLine("");\n}\nelse\n{\n    Console.WriteLine("");\n}',
  expectedOutput: "Vinst!",
  hint: "Använd if/else med bool-variabeln direkt",
  tag: "Booleans",
};
