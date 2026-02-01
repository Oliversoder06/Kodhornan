import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l6-latt-1",
  lesson: 6,
  difficulty: "lätt",
  instructions: "Öka score med 5.",
  starterCode: `int score = 10;
score = score + ___;
Console.WriteLine(score);`,
  expectedOutput: `15`,
  hints: ["Vi vill lägga till 5"],
  tag: "Matte",
};
