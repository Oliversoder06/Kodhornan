import type { Exercise } from "../../../exercise.schema";

export const exercise: Exercise = {
  id: "l1-svar-2",
  lesson: 1,
  difficulty: "svår",
  instructions: "Nedräkning 3, 2, 1.",
  starterCode: `Console.WriteLine("1");
___`,
  expectedOutput: `3
2
1`,
  hints: ["Skriv i omvänd ordning"],
  tag: "Output",
};
