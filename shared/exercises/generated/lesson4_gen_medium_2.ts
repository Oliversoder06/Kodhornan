import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l4-gen-med-2",
  lesson: 4,
  difficulty: "medel",
  instructions:
    "Skapa en variabel 'ålder' med värdet 16. Om den är < 18, skriv 'Ung', annars skriv 'Vuxen'.",
  starterCode:
    'int ålder = 16;\nif (ålder  18)\n{\n    Console.WriteLine("Ung");\n}\nelse\n{\n    Console.WriteLine("Vuxen");\n}',
  expectedOutput: "Ung",
  hint: "Använd < för att jämföra",
  tag: "Villkor",
};
