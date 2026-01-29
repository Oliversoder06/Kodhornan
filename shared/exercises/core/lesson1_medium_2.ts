import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l1-medium-2",
  lesson: 1,
  difficulty: "medel",
  instructions:
    "Skapa en variabel med värdet 10, ändra sedan värdet till 20 och skriv ut det nya värdet.",
  starterCode: "int poäng = ;\npoäng = ;\nConsole.WriteLine(poäng);",
  expectedOutput: "20",
  hint: "Tilldela ett nytt värde till samma variabel",
  tag: "Variabler",
};
