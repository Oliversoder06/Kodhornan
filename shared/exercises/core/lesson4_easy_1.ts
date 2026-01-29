import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l4-easy-1",
  lesson: 4,
  difficulty: "lätt",
  instructions:
    "Använd if för att kolla om 10 är större än 5. Om det är sant, skriv ut 'Sant'.",
  starterCode: 'if (10  5)\n{\n    Console.WriteLine("");\n}',
  expectedOutput: "Sant",
  hint: "Använd > för att jämföra",
  tag: "Villkor",
};
