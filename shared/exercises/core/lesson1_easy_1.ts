import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l1-easy-1",
  lesson: 1,
  difficulty: "lätt",
  instructions: "Skapa en variabel för poängen (score) med värdet 5 och skriv ut den.",
  starterCode: "int score = ;\nConsole.WriteLine(score);",
  expectedOutput: "5",
  hints: [
    "Sätt in ett tal efter =",
    "Score betyder poäng i spel",
    "int score = 5;"
  ],
  tag: "Variabler",
};
