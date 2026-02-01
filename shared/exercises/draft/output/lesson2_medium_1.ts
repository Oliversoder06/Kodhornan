import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l2-medel-1",
  lesson: 2,
  difficulty: "medel",
  instructions: "Fixa start-mitten-slut ordningen.",
  starterCode: `Console.WriteLine("Slut");
Console.WriteLine("Start");
Console.WriteLine("Mitten");`,
  expectedOutput: `Start
Mitten
Slut`,
  hints: ["Flytta Start högst upp"],
  tag: "Output",
};
