import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l11-latt-1",
  lesson: 11,
  difficulty: "lätt",
  instructions: "Spara vapenval i variabeln weapon.",
  starterCode: `Console.Write("Vapen: ");
string weapon = ___;
Console.WriteLine("Valt: " + weapon);`,
  expectedOutput: `Valt: Sword`,
  hints: ["Console.ReadLine()"],
  tag: "Input",
};
