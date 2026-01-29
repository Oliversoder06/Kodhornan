import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l2-gen-med-2",
  lesson: 2,
  difficulty: "medel",
  instructions:
    "Skapa två tal (x=25, y=75) och skriv ut dem. Sedan skriv ut deras summa direkt med Console.WriteLine.",
  starterCode:
    "int x = ;\nint y = ;\nConsole.WriteLine(x);\nConsole.WriteLine(y);\nConsole.WriteLine(x + y);",
  expectedOutput: "25\n75\n100",
  hint: "Du kan skriva ut ett matematiskt uttryck direkt",
  tag: "Output",
};
