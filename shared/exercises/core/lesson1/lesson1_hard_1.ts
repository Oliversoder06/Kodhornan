import type { Exercise } from "../../../exercise.schema";

export const exercise: Exercise = {
  id: "l1-svar-1",
  lesson: 1,
  difficulty: "svår",
  instructions: "Rita en box med tre rader kod.",
  starterCode: `Console.WriteLine(" ---");
Console.WriteLine("| X |");
___`,
  expectedOutput: ` ---
| X |
 ---`,
  hints: ["Kopiera första raden till slutet"],
  tag: "Output",
};
