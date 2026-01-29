import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l1-gen-med-2",
  lesson: 1,
  difficulty: "medel",
  instructions:
    "Skapa en bool 'isReady' som är false. Ändra den till true. Skapa en int 'count' med värdet 0 och öka den till 5. Skriv ut båda.",
  starterCode:
    "bool isReady = ;\nisReady = ;\nint count = ;\ncount = ;\nConsole.WriteLine(isReady);\nConsole.WriteLine(count);",
  expectedOutput: "True\n5",
  hint: "Byt värden på variablerna efter initialisering",
  tag: "Variabler",
};
