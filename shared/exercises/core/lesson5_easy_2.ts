import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l5-easy-2",
  lesson: 5,
  difficulty: "lätt",
  instructions:
    "Skapa en bool 'gameOver' med värdet false. Om den är false, skriv 'Spelet fortsätter'.",
  starterCode:
    'bool gameOver = ;\nif (!gameOver)\n{\n    Console.WriteLine("Spelet fortsätter");\n}',
  expectedOutput: "Spelet fortsätter",
  hint: "Använd ! för att invertera ett bool-värde",
  tag: "Booleans",
};
