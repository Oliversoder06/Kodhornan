import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l11-svar-1",
  lesson: 11,
  difficulty: "svår",
  instructions: "Echo input tre gånger.",
  starterCode: `string ord = Console.ReadLine();
Console.WriteLine(ord + ord + ord);`,
  expectedOutput: `HejHejHej`,
  hints: ["Ingen ändring behövs om logiken är rätt"],
  tag: "Input",
};
