import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l7-gen-svår-1",
  lesson: 7,
  difficulty: "svår",
  instructions:
    "Räkna hur många tal från 1 till 20 som är delbara med 3 ELLER 5. Använd en räknare och en loop. Skriv ut antalet.",
  starterCode:
    "int antal = 0;\nfor (int i = 1; i <= 20; i++)\n{\n    if (i % 3  0 || i % 5  0)\n    {\n        antal  1;\n    }\n}\nConsole.WriteLine(antal);",
  expectedOutput: "9",
  hint: "Tal delbara med 3 eller 5: 3,5,6,9,10,12,15,18,20 = 9 st",
  tag: "Kombinerad Logik",
};
