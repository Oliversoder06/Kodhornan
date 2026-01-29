import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l7-gen-med-1",
  lesson: 7,
  difficulty: "medel",
  instructions:
    "Skapa en variabel 'summa' med värdet 0. Loopa från 1 till 5 och addera varje tal till summan. Skriv ut slutsumman.",
  starterCode:
    "int summa = 0;\nfor (int i = ; i  ; i++)\n{\n    summa  i;\n}\nConsole.WriteLine(summa);",
  expectedOutput: "15",
  hint: "Använd += för att lägga till varje i till summa. 1+2+3+4+5=15",
  tag: "Kombinerad Logik",
};
