import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l4-easy-2",
  lesson: 4,
  difficulty: "lätt",
  instructions: "Kolla om 5 är lika med 5 och skriv ut 'Lika'.",
  starterCode: 'if (5  5)\n{\n    Console.WriteLine("Lika");\n}',
  expectedOutput: "Lika",
  hint: "Använd == för att kontrollera om två värden är lika",
  tag: "Villkor",
};
