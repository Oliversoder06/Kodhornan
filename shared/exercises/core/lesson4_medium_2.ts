import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l4-medium-2",
  lesson: 4,
  difficulty: "medel",
  instructions:
    "Skapa en variabel med värdet 7. Kolla om den INTE är lika med 10 och skriv 'Olika'.",
  starterCode:
    'int nummer = 7;\nif (nummer  10)\n{\n    Console.WriteLine("Olika");\n}',
  expectedOutput: "Olika",
  hint: "Använd != för 'inte lika med'",
  tag: "Villkor",
};
