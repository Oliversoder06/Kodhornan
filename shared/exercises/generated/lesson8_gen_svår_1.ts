import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l8-gen-svår-1",
  lesson: 8,
  difficulty: "svår",
  instructions:
    "Skapa två metoder: 'SkrivStjärnor' som skriver 3 stjärnor (***) och 'SkrivLinje' som skriver 'Linje'. Anropa dem i ordning: stjärnor, linje, stjärnor.",
  starterCode:
    'void SkrivStjärnor()\n{\n    Console.WriteLine("");\n}\n\nvoid SkrivLinje()\n{\n    Console.WriteLine("");\n}\n\nSkrivStjärnor();\nSkrivLinje();\nSkrivStjärnor();',
  expectedOutput: "***\nLinje\n***",
  hint: "Skapa två separata metoder och anropa dem i rätt ordning",
  tag: "Metoder",
};
