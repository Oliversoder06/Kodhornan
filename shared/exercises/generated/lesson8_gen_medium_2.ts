import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l8-gen-med-2",
  lesson: 8,
  difficulty: "medel",
  instructions:
    "Skapa en metod 'RäknaNedFrånTio' som räknar ner från 10 till 1. Anropa metoden två gånger.",
  starterCode:
    "void RäknaNedFrånTio()\n{\n    for (int i = ; i  ; i--)\n    {\n        Console.WriteLine(i);\n    }\n}\n\nRäknaNedFrånTio();\nRäknaNedFrånTio();",
  expectedOutput:
    "10\n9\n8\n7\n6\n5\n4\n3\n2\n1\n10\n9\n8\n7\n6\n5\n4\n3\n2\n1",
  hint: "Räkna från 10 till 1 med i--",
  tag: "Metoder",
};
