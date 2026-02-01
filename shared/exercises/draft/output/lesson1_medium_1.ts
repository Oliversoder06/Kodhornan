import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l1-medel-1",
  lesson: 1,
  difficulty: "medel",
  instructions: "Skriv ut två rader: \"Loading...\" och \"Complete!\".",
  starterCode: `Console.WriteLine("Loading...");
Console.WriteLine(___);`,
  expectedOutput: `Loading...
Complete!`,
  hints: ["Varje rad behöver ett eget kommando", "Semikolon på båda raderna"],
  tag: "Output",
};
