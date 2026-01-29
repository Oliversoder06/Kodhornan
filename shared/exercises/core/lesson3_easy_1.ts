import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l3-easy-1",
  lesson: 3,
  difficulty: "lätt",
  instructions:
    "Lägg ihop 5 och 3, spara i en variabel och skriv ut resultatet.",
  starterCode: "int summa = 5  3;\nConsole.WriteLine(summa);",
  expectedOutput: "8",
  hint: "Använd + för att addera",
  tag: "Matematik",
};
