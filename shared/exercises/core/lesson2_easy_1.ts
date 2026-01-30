import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l2-easy-1",
  lesson: 2,
  difficulty: "lätt",
  instructions: "Skapa två variabler: 'lives' (antal liv) och 'level' (vilken bana). Skriv ut båda på separata rader.",
  starterCode: 'int lives = ;\nstring level = "";\nConsole.WriteLine(lives);\nConsole.WriteLine(level);',
  expectedOutput: "3\nLevel 1",
  hints: [
    "Sätt värden för både lives och level",
    "Lives är ett tal, level är text",
    'int lives = 3;\nstring level = "Level 1";'
  ],
  tag: "Variabler",
};
