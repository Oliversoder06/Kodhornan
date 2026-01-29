import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l2-gen-svår-1",
  lesson: 2,
  difficulty: "svår",
  instructions:
    "Skapa en karaktärsprofil: string namn='Gandalf', int nivå=99, int mana=500, bool kanTrolla=true. Skriv ut en sammanfattning på 4 rader.",
  starterCode:
    'string namn = "";\nint nivå = ;\nint mana = ;\nbool kanTrolla = ;\nConsole.WriteLine(namn);\nConsole.WriteLine(nivå);\nConsole.WriteLine(mana);\nConsole.WriteLine(kanTrolla);',
  expectedOutput: "Gandalf\n99\n500\nTrue",
  hint: "Bygg upp en komplett karaktärsprofil med flera variabler",
  tag: "Output",
};
