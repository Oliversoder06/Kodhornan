import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l6-svar-1",
  lesson: 6,
  difficulty: "svår",
  instructions: "Räkna ut poängbonus.",
  starterCode: `int baseScore = 100;
int bonus = 25;
Console.WriteLine(baseScore ___ bonus);`,
  expectedOutput: `125`,
  hints: ["Använd +"],
  tag: "Matte",
};
