import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l9-gen-med-1",
  lesson: 9,
  difficulty: "medel",
  instructions:
    "Skapa ett enkelt coin-collecting spel. coins=0, samla 5 coins i en loop (lägg till 1 varje gång). Om coins når 5, skriv 'Nivå klarad!'.",
  starterCode:
    'int coins = 0;\nfor (int i = 0; i < 5; i++)\n{\n    coins  1;\n}\nif (coins  5)\n{\n    Console.WriteLine("Nivå klarad!");\n}',
  expectedOutput: "Nivå klarad!",
  hint: "Använd += 1 för att samla coins, == för att kolla",
  tag: "Spellogik",
};
