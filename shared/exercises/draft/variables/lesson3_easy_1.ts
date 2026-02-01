import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l3-latt-1",
  lesson: 3,
  difficulty: "lätt",
  instructions: "Skapa en variabel för namnet \"Mario\".",
  starterCode: `string name = ___;
Console.WriteLine(name);`,
  expectedOutput: `Mario`,
  hints: ["Text måste ha citattecken", "Variabeln heter name"],
  tag: "Variabler",
};
