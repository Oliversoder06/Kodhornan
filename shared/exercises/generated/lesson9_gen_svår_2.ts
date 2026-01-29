import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l9-gen-svår-2",
  lesson: 9,
  difficulty: "svår",
  instructions:
    "Skapa en shop-simulator: guld=100, itemPris=25, antalItems=0. Köp items i en loop så länge guld >= itemPris (max 5 köp). Efter varje köp: dra av pris, öka antal. Skriv ut antal items köpta.",
  starterCode:
    "int guld = 100;\nint itemPris = 25;\nint antalItems = 0;\n\nfor (int i = 0; i < 5; i++)\n{\n    if (guld  itemPris)\n    {\n        guld  itemPris;\n        antalItems  1;\n    }\n}\n\nConsole.WriteLine(antalItems);",
  expectedOutput: "4",
  hint: "Kan köpa 4 items: 100/25=4. Efter 4 köp har du 0 guld kvar",
  tag: "Spellogik",
};
