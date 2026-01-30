import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l3-easy-1",
  lesson: 3,
  difficulty: "lätt",
  instructions:
    "Spelaren har 5 coins och hittar 3 till. Lägg ihop dem och skriv ut totalen.",
  starterCode: "int totalCoins = 5  3;\nConsole.WriteLine(totalCoins);",
  expectedOutput: "8",
  hints: [
    "Använd + för att addera",
    "5 + 3 = ?",
    "int totalCoins = 5 + 3;"
  ],
  tag: "Matematik",
};
