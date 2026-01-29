import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l8-gen-med-1",
  lesson: 8,
  difficulty: "medel",
  instructions:
    "Skapa en metod 'SkrivMeddelande' som skriver ut 'Välkommen!' tre gånger med en loop. Anropa metoden.",
  starterCode:
    'void SkrivMeddelande()\n{\n    for (int i = 0; i  ; i++)\n    {\n        Console.WriteLine("");\n    }\n}\n\nSkrivMeddelande();',
  expectedOutput: "Välkommen!\nVälkommen!\nVälkommen!",
  hint: "Loopa 3 gånger och skriv ut texten varje gång",
  tag: "Metoder",
};
