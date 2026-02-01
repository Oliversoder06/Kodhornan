import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l9-latt-1",
  lesson: 9,
  difficulty: "lätt",
  instructions: "Dela loot på 2.",
  starterCode: `int loot = 100;
int share = loot ___ 2;
Console.WriteLine(share);`,
  expectedOutput: `50`,
  hints: ["Använd /"],
  tag: "Matte",
};
