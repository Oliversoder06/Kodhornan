import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l4-gen-med-1",
  lesson: 4,
  difficulty: "medel",
  instructions:
    "Skapa en variabel 'temperatur' med värdet 22. Om den är >= 20, skriv 'Varmt', annars 'Kallt'.",
  starterCode:
    'int temperatur = 22;\nif (temperatur  20)\n{\n    Console.WriteLine("Varmt");\n}\nelse\n{\n    Console.WriteLine("Kallt");\n}',
  expectedOutput: "Varmt",
  hint: "Använd >= för 'större än eller lika med'",
  tag: "Villkor",
};
