import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l4-gen-svår-1",
  lesson: 4,
  difficulty: "svår",
  instructions:
    "Skapa en variabel 'poäng' med värdet 75. Om poäng >= 90 skriv 'A', annars om >= 70 skriv 'B', annars skriv 'C'.",
  starterCode:
    'int poäng = 75;\nif (poäng  90)\n{\n    Console.WriteLine("A");\n}\nelse if (poäng  70)\n{\n    Console.WriteLine("B");\n}\nelse\n{\n    Console.WriteLine("C");\n}',
  expectedOutput: "B",
  hint: "Använd else if för flera villkor",
  tag: "Villkor",
};
