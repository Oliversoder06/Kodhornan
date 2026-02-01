import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l10-svar-1",
  lesson: 10,
  difficulty: "svår",
  instructions: "Läs in två saker efter varandra.",
  starterCode: `string a = Console.ReadLine();
string b = ___;
Console.WriteLine(a + b);`,
  expectedOutput: `HejDå`,
  hints: ["Läs in en gång till"],
  tag: "Input",
};
