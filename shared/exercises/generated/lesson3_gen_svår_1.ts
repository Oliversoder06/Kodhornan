import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l3-gen-svår-1",
  lesson: 3,
  difficulty: "svår",
  instructions:
    "Skapa en räknare som börjar på 1. Multiplicera med 2, addera 10, dividera med 2, subtrahera 5. Skriv ut slutresultatet.",
  starterCode:
    "int resultat = 1;\nresultat = resultat  2;\nresultat = resultat  10;\nresultat = resultat  2;\nresultat = resultat  5;\nConsole.WriteLine(resultat);",
  expectedOutput: "1",
  hint: "1 * 2 = 2, 2 + 10 = 12, 12 / 2 = 6, 6 - 5 = 1",
  tag: "Matematik",
};
