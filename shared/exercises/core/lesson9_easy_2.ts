import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l9-easy-2",
  lesson: 9,
  difficulty: "lätt",
  instructions:
    "Skapa en bool 'hasWon' och sätt den till true om poängen är 100 eller mer. Skriv ut hasWon.",
  starterCode:
    "int poäng = 100;\nbool hasWon = poäng  100;\nConsole.WriteLine(hasWon);",
  expectedOutput: "True",
  hint: "Använd >= för att kolla om poängen är 100 eller mer",
  tag: "Spellogik",
};
