import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l8-easy-2",
  lesson: 8,
  difficulty: "lätt",
  instructions:
    "Skapa en metod 'SkrivTal' som skriver ut talet 100. Anropa metoden två gånger.",
  starterCode:
    "void SkrivTal()\n{\n    Console.WriteLine();\n}\n\nSkrivTal();\nSkrivTal();",
  expectedOutput: "100\n100",
  hint: "Anropa samma metod flera gånger för återanvändning",
  tag: "Metoder",
};
