import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l5-medel-1",
  lesson: 5,
  difficulty: "medel",
  instructions: "Återställ hälsa till 100.",
  starterCode: `int hp = 50;
___ = 100;
Console.WriteLine(hp);`,
  expectedOutput: `100`,
  hints: ["Använd variabelnamnet hp"],
  tag: "Variabler",
};
