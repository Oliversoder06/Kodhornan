import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l6-medel-1",
  lesson: 6,
  difficulty: "medel",
  instructions: "Summera guld från två kistor.",
  starterCode: `int chest1 = 100;
int chest2 = 50;
int total = ___ + ___;
Console.WriteLine(total);`,
  expectedOutput: `150`,
  hints: ["Addera chest1 och chest2"],
  tag: "Matte",
};
