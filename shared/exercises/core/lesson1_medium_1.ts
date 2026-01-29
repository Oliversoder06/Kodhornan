import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l1-medium-1",
  lesson: 1,
  difficulty: "medium",
  instructions: "Skapa två variabler: ett tal och en text. Skriv ut båda på separata rader.",
  starterCode: 'int ålder = ;\nstring stad = "";\nConsole.WriteLine(ålder);\nConsole.WriteLine(stad);',
  expectedOutput: "25\nStockholm",
  hint: "Sätt värden för både ålder och stad",
};
