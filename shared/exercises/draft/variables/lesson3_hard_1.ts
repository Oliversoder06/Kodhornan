import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l3-svar-1",
  lesson: 3,
  difficulty: "svår",
  instructions: "Spara din favoritfärg i en variabel.",
  starterCode: `___ color = ___;
Console.WriteLine(color);`,
  expectedOutput: `Blå`,
  hints: ["Välj vilken färg du vill (här väntar vi oss Blå)"],
  tag: "Variabler",
};
