import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l5-easy-1",
  lesson: 5,
  difficulty: "lätt",
  instructions:
    "Skapa en bool-variabel 'isAlive' med värdet true. Om den är true, skriv 'Levande'.",
  starterCode:
    'bool isAlive = ;\nif (isAlive)\n{\n    Console.WriteLine("Levande");\n}',
  expectedOutput: "Levande",
  hint: "Du kan använda bool-variabler direkt i if-satser",
  tag: "Booleans",
};
