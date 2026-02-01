import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l7-medel-1",
  lesson: 7,
  difficulty: "medel",
  instructions: "Ta skada från en fälla.",
  starterCode: `int hp = 50;
int trapDamage = 15;
hp = hp - ___;
Console.WriteLine(hp);`,
  expectedOutput: `35`,
  hints: ["Använd trapDamage"],
  tag: "Matte",
};
