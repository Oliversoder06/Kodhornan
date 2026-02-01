import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l8-svar-1",
  lesson: 8,
  difficulty: "svår",
  instructions: "Area av en rektangel.",
  starterCode: `int w = 5;
int h = 10;
Console.WriteLine(___);`,
  expectedOutput: `50`,
  hints: ["Bredd gånger höjd"],
  tag: "Matte",
};
