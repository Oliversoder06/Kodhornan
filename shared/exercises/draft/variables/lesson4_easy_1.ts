import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l4-latt-1",
  lesson: 4,
  difficulty: "lätt",
  instructions: "Spara 100 guldmynt i variabeln coins.",
  starterCode: `int coins = ___;
Console.WriteLine(coins);`,
  expectedOutput: `100`,
  hints: ["int betyder ett heltal"],
  tag: "Variabler",
};
