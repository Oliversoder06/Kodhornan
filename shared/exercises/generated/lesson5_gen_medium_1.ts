import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l5-gen-med-1",
  lesson: 5,
  difficulty: "medel",
  instructions:
    "Skapa två bool: 'hasKey'=true och 'doorLocked'=true. Om hasKey är true OCH doorLocked är true, skriv 'Öppnar dörr', annars 'Kan inte öppna'.",
  starterCode:
    'bool hasKey = ;\nbool doorLocked = ;\nif (hasKey && doorLocked)\n{\n    Console.WriteLine("Öppnar dörr");\n}\nelse\n{\n    Console.WriteLine("Kan inte öppna");\n}',
  expectedOutput: "Öppnar dörr",
  hint: "Använd && för att kombinera två bool-villkor",
  tag: "Booleans",
};
