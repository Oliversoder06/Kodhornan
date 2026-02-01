import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l8-medel-1",
  lesson: 8,
  difficulty: "medel",
  instructions: "Räkna ut total skada (strength * 4).",
  starterCode: `int str = 10;
int dmg = ___
Console.WriteLine(dmg);`,
  expectedOutput: `40`,
  hints: ["Glöm inte *"],
  tag: "Matte",
};
