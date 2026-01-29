import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l1-gen-med-1",
  lesson: 1,
  difficulty: "medel",
  instructions:
    "Skapa tre variabler: två int-variabler (a=10, b=20) och en string (namn='Test'). Ändra a till 15 och skriv ut alla tre variablerna.",
  starterCode:
    'int a = ;\nint b = ;\nstring namn = "";\na = ;\nConsole.WriteLine(a);\nConsole.WriteLine(b);\nConsole.WriteLine(namn);',
  expectedOutput: "15\n20\nTest",
  hint: "Sätt initiala värden och ändra sedan a",
  tag: "Variabler",
};
