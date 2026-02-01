import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l4-medel-1",
  lesson: 4,
  difficulty: "medel",
  instructions: "Gör en variabel för damage (50).",
  starterCode: `int damage = 50;
Console.WriteLine(damage);`,
  expectedOutput: `50`,
  hints: ["Något saknas i slutet på rad 1"],
  tag: "Variabler",
};
