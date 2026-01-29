import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l2-easy-2",
  lesson: 2,
  difficulty: "lätt",
  instructions: "Skriv ut texten 'Hej!' och sedan talet 42 på separata rader.",
  starterCode: 'Console.WriteLine("");\nConsole.WriteLine();',
  expectedOutput: "Hej!\n42",
  hint: "Text behöver citattecken, tal inte",
  tag: "Output",
};
