import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l3-medium-1",
  lesson: 3,
  difficulty: "medel",
  instructions:
    "Skapa en variabel med värdet 100. Använd += för att öka den med 50, och skriv sedan ut den.",
  starterCode: "int poäng = 100;\npoäng  50;\nConsole.WriteLine(poäng);",
  expectedOutput: "150",
  hint: "+= lägger till värdet till variabeln",
  tag: "Matematik",
};
