import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l1-easy-2",
  lesson: 1,
  difficulty: "easy",
  instructions: "Skapa en variabel med ditt namn som text och skriv ut den.",
  starterCode: 'string namn = "";\nConsole.WriteLine(namn);',
  expectedOutput: "Alex",
  hint: "Skriv ditt namn mellan citattecknen",
};
