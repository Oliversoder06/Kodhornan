import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l9-easy-1",
  lesson: 9,
  difficulty: "lätt",
  instructions:
    "Skapa en variabel 'poäng' med värdet 0. Öka den med 10 och skriv ut poängen.",
  starterCode: "int poäng = 0;\npoäng  10;\nConsole.WriteLine(poäng);",
  expectedOutput: "10",
  hint: "Använd += för att öka poängen",
  tag: "Spellogik",
};
