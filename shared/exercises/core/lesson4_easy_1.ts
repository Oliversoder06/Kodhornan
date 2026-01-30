import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l4-easy-1",
  lesson: 4,
  difficulty: "lätt",
  instructions:
    "Kolla om spelarens health (10) är mer än 5. Om det är sant, skriv ut 'Alive'.",
  starterCode: 'int health = 10;\nif (health  5)\n{\n    Console.WriteLine("");\n}',
  expectedOutput: "Alive",
  hints: [
    "Använd > för att jämföra",
    "if (health > 5) betyder 'om health är större än 5'",
    'if (health > 5)\n{\n    Console.WriteLine("Alive");\n}'
  ],
  tag: "Villkor",
};
