import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l9-medel-1",
  lesson: 9,
  difficulty: "medel",
  instructions: "Dela 10 äpplen på 3 personer (se vad som händer med heltal).",
  starterCode: `int apples = 10;
Console.WriteLine(apples / 3);`,
  expectedOutput: `3`,
  hints: ["Heltal avrundas alltid neråt"],
  tag: "Matte",
};
