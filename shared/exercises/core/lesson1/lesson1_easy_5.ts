import type { Exercise } from "../../../exercise.schema";

export const exercise: Exercise = {
  id: "l1-latt-5",
  lesson: 1,
  difficulty: "lätt",
  instructions: "Ändra värdet på score till 10.",
  starterCode: `int score = 0;
score = ___;
Console.WriteLine(score);`,
  expectedOutput: `10`,
  hints: ["Du behöver inte skriva int igen"],
  tag: "Variabler",
};
