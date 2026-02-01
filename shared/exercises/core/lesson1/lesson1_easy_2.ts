import type { Exercise } from "../../../exercise.schema";

export const exercise: Exercise = {
  id: "l1-latt-2",
  lesson: 1,
  difficulty: "lätt",
  instructions: "Rätta ordningen! Programmet ska skriva 1, sen 2.",
  starterCode: `Console.WriteLine("2");
Console.WriteLine("1");`,
  expectedOutput: `1
2`,
  hints: ["Klipp och klistra rader", "Datorn läser uppifrån och ner"],
  tag: "Output",
};
