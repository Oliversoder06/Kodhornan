import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l8-latt-1",
  lesson: 8,
  difficulty: "lätt",
  instructions: "Dubbla poängen.",
  starterCode: `int score = 50;
score = score ___ 2;
Console.WriteLine(score);`,
  expectedOutput: `100`,
  hints: ["Använd * för gånger"],
  tag: "Matte",
};
