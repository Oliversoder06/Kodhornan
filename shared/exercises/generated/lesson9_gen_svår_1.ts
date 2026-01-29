import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l9-gen-svår-1",
  lesson: 9,
  difficulty: "svår",
  instructions:
    "Skapa ett boss-fight system: bossLiv=30, spelarSkada=7, bossSkada=5, spelarLiv=25. Loopa tills någon når 0 liv. Varje runda: minska boss liv, kolla om död (skriv 'Du vann!'), minska spelar liv, kolla om död (skriv 'Du förlorade').",
  starterCode:
    'int bossLiv = 30;\nint spelarSkada = 7;\nint bossSkada = 5;\nint spelarLiv = 25;\n\nfor (int runda = 1; runda <= 10; runda++)\n{\n    bossLiv  spelarSkada;\n    if (bossLiv  0)\n    {\n        Console.WriteLine("Du vann!");\n        break;\n    }\n    \n    spelarLiv  bossSkada;\n    if (spelarLiv  0)\n    {\n        Console.WriteLine("Du förlorade");\n        break;\n    }\n}',
  expectedOutput: "Du vann!",
  hint: "Boss tar 7 skada varje runda: 30-7=23, 23-7=16, 16-7=9, 9-7=2, 2-7=-5 (död efter 5 rundor)",
  tag: "Spellogik",
};
