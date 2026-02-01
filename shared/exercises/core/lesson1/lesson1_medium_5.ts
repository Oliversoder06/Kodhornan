import type { Exercise } from "../../../exercise.schema";

export const exercise: Exercise = {
  id: "l1-medel-5",
  lesson: 1,
  difficulty: "medel",
  instructions: "Återställ hälsa till 100.",
  starterCode: `int hp = 50;
___ = 100;
Console.WriteLine(hp);`,
  expectedOutput: `100`,
  hints: ["Använd variabelnamnet hp"],
  tag: "Variabler",
};
