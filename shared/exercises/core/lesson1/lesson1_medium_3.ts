import type { Exercise } from "../../../exercise.schema";

export const exercise: Exercise = {
  id: "l1-medel-3",
  lesson: 1,
  difficulty: "medel",
  instructions: "Skapa två variabler: hero och enemy.",
  starterCode: `string hero = "Link";
___ enemy = "Ganon";
Console.WriteLine(hero + " vs " + enemy);`,
  expectedOutput: `Link vs Ganon`,
  hints: ["Båda är av typen string"],
  tag: "Variabler",
};
