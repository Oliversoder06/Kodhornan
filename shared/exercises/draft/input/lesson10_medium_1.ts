import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l10-medel-1",
  lesson: 10,
  difficulty: "medel",
  instructions: "Fråga efter quest.",
  starterCode: `Console.WriteLine("Quest?");
___ q = Console.ReadLine();
Console.WriteLine("Accepted: " + q);`,
  expectedOutput: `Accepted: Save the King`,
  hints: ["Variabeltypen är string"],
  tag: "Input",
};
