import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l10-latt-1",
  lesson: 10,
  difficulty: "lätt",
  instructions: "Läs in namn och skriv ut (testa med 'Kim').",
  starterCode: `Console.Write("Namn: ");
string name = Console.___
Console.WriteLine("Hej " + name);`,
  expectedOutput: `Hej Kim`,
  hints: ["ReadLine()"],
  tag: "Input",
};
