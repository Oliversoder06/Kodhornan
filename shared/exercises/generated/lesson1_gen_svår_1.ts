import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l1-gen-svår-1",
  lesson: 1,
  difficulty: "svår",
  instructions:
    "Skapa ett litet variabler-pussel: int a=5, b=10, c=15. Byt värdena så a blir 10, b blir 15, c blir 5. Skriv ut alla tre.",
  starterCode:
    "int a = 5;\nint b = 10;\nint c = 15;\nint temp = a;\na = ;\nb = ;\nc = ;\nConsole.WriteLine(a);\nConsole.WriteLine(b);\nConsole.WriteLine(c);",
  expectedOutput: "10\n15\n5",
  hint: "Använd en temp-variabel för att byta värden",
  tag: "Variabler",
};
