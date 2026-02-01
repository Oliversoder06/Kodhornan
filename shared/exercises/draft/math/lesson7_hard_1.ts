import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l7-svar-1",
  lesson: 7,
  difficulty: "svår",
  instructions: "Räkna ut återstående ammo.",
  starterCode: `int maxAmmo = 30;
int shot = 5;
Console.WriteLine(___);`,
  expectedOutput: `25`,
  hints: ["maxAmmo minus shot"],
  tag: "Matte",
};
