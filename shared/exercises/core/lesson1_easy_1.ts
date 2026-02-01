import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l1-latt-1",
  lesson: 1,
  difficulty: "lätt",
  instructions: "Skriv ut texten \"Game Over\" till konsolen.",
  starterCode: `Console.WriteLine(___);`,
  expectedOutput: `Game Over`,
  hints: ["Använd citattecken runt texten", "Glöm inte semikolon ;"],
  tag: "Output",
};
