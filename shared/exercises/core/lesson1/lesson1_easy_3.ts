import type { Exercise } from "../../../exercise.schema";

export const exercise: Exercise = {
  id: "l1-latt-3",
  lesson: 1,
  difficulty: "lätt",
  instructions: 'Skapa en variabel för namnet "Mario".',
  starterCode: `string name = ___;
Console.WriteLine(name);`,
  expectedOutput: `Mario`,
  hints: ["Text måste ha citattecken", "Variabeln heter name"],
  tag: "Variabler",
};
