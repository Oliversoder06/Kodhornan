import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l2-medium-1",
  lesson: 2,
  difficulty: "medel",
  instructions:
    "Skapa en string-variabel med ditt namn och en int-variabel med din ålder. Skriv ut båda med Console.WriteLine.",
  starterCode:
    'string namn = "";\nint ålder = ;\nConsole.WriteLine(namn);\nConsole.WriteLine(ålder);',
  expectedOutput: "Anna\n25",
  hint: "Använd valfritt namn och ålder",
  tag: "Output",
};
