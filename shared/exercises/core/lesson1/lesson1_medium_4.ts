import type { Exercise } from "../../../exercise.schema";

export const exercise: Exercise = {
  id: "l1-medel-4",
  lesson: 1,
  difficulty: "medel",
  instructions: "Gör en variabel för damage (50).",
  starterCode: `int ____ = 50;
Console.WriteLine(damage);`,
  expectedOutput: `50`,
  hints: ["Något saknas i slutet på rad 1"],
  tag: "Variabler",
};
