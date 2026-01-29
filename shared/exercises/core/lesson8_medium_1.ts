import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l8-medium-1",
  lesson: 8,
  difficulty: "medel",
  instructions:
    "Skapa en metod 'RäknaFrånEttTillTre' som använder en loop för att skriva ut 1, 2, 3. Anropa metoden.",
  starterCode:
    "void RäknaFrånEttTillTre()\n{\n    for (int i = ; i  ; i++)\n    {\n        Console.WriteLine(i);\n    }\n}\n\nRäknaFrånEttTillTre();",
  expectedOutput: "1\n2\n3",
  hint: "Loopa från 1 till 3",
  tag: "Metoder",
};
