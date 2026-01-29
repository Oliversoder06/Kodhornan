import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l2-gen-med-1",
  lesson: 2,
  difficulty: "medel",
  instructions:
    "Skapa variabler för ett spel: string spelarNamn='Hero', int liv=100, bool isAlive=true. Skriv ut alla tre på separata rader.",
  starterCode:
    'string spelarNamn = "";\nint liv = ;\nbool isAlive = ;\nConsole.WriteLine(spelarNamn);\nConsole.WriteLine(liv);\nConsole.WriteLine(isAlive);',
  expectedOutput: "Hero\n100\nTrue",
  hint: "Kombinera olika datatyper i samma program",
  tag: "Output",
};
