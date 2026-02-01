import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l25-medel-1",
  lesson: 25,
  difficulty: "medel",
  instructions: "Mer avancerad void Func(string s). Använd \"citat\" här.",
  starterCode: `void Say(string msg) { }
// Fixa logiken`,
  expectedOutput: `Correct`,
  hints: ["Tänk på logiken"],
  tag: "ParamsString",
};
