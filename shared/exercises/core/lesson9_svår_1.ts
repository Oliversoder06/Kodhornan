import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l9-svår-1",
  lesson: 9,
  difficulty: "svår",
  instructions:
    "Skapa ett komplett mini-spel: 5 liv, fiende dyker upp var 2:a runda (loop 1-6). Om runda är jämn, minska liv med 1. Om liv når 0, skriv 'Game Over' och avsluta. Annars skriv 'Du klarade dig!' efter loopen.",
  starterCode:
    'int liv = 5;\n\nfor (int runda = 1; runda <= 6; runda++)\n{\n    if (runda % 2  0)\n    {\n        liv  1;\n    }\n    \n    if (liv  0)\n    {\n        Console.WriteLine("Game Over");\n        break;\n    }\n}\n\nif (liv  0)\n{\n    Console.WriteLine("Du klarade dig!");\n}',
  expectedOutput: "Du klarade dig!",
  hint: "Använd % 2 == 0 för jämna rundor, -= för att minska liv, == för jämförelser och > för att kolla om liv är över 0",
  tag: "Spellogik",
};
