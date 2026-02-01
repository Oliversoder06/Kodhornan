import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l11-medel-1",
  lesson: 11,
  difficulty: "medel",
  instructions: "Byt namn på variabeln till food.",
  starterCode: `string ___ = Console.ReadLine();
Console.WriteLine("Äter " + food);`,
  expectedOutput: `Äter Pizza`,
  hints: ["Variabeln ska heta food"],
  tag: "Input",
};
