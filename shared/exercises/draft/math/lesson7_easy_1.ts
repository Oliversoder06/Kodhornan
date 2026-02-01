import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l7-latt-1",
  lesson: 7,
  difficulty: "lätt",
  instructions: "Minska hp med 10.",
  starterCode: `int hp = 100;
hp = hp ___ 10;
Console.WriteLine(hp);`,
  expectedOutput: `90`,
  hints: ["Använd minus"],
  tag: "Matte",
};
