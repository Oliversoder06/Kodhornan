import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l3-gen-med-2",
  lesson: 3,
  difficulty: "medel",
  instructions:
    "Skapa 'tal' med värdet 100. Dela det med 2, sedan multiplicera med 3, sedan subtrahera 50. Skriv ut resultatet.",
  starterCode:
    "int tal = 100;\ntal = tal  2;\ntal = tal  3;\ntal = tal  50;\nConsole.WriteLine(tal);",
  expectedOutput: "100",
  hint: "100 / 2 = 50, 50 * 3 = 150, 150 - 50 = 100",
  tag: "Matematik",
};
