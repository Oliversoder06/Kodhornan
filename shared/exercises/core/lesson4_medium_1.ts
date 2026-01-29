import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l4-medium-1",
  lesson: 4,
  difficulty: "medel",
  instructions:
    "Skapa en variabel med värdet 15. Om den är större än 10, skriv 'Stort', annars skriv 'Litet'.",
  starterCode:
    'int tal = 15;\nif (tal  10)\n{\n    Console.WriteLine("");\n}\nelse\n{\n    Console.WriteLine("");\n}',
  expectedOutput: "Stort",
  hint: "Använd if och else med > för jämförelse",
  tag: "Villkor",
};
