import type { Exercise } from "../../../exercise.schema";

export const exercise: Exercise = {
  id: "l1-svar-3",
  lesson: 1,
  difficulty: "svår",
  instructions: "Spara färgen `Blå` i en variabel.",
  starterCode: `___ color = "Blå";
Console.WriteLine(color);`,
  expectedOutput: `Blå`,
  hints: ["Färgen är en string, alltså en text.","Tänk på att du behöver citattecken runt texten"],
  tag: "Variabler",
};
