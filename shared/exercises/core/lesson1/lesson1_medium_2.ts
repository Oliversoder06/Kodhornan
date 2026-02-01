import type { Exercise } from "../../../exercise.schema";

export const exercise: Exercise = {
  id: "l1-medel-2",
  lesson: 1,
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
