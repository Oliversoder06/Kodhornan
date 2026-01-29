import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l3-easy-2",
  lesson: 3,
  difficulty: "lätt",
  instructions:
    "Skapa en variabel med värdet 10. Multiplicera den med 2 och skriv ut resultatet.",
  starterCode:
    "int tal = 10;\nint resultat = tal  2;\nConsole.WriteLine(resultat);",
  expectedOutput: "20",
  hint: "Använd * för multiplikation",
  tag: "Matematik",
};
