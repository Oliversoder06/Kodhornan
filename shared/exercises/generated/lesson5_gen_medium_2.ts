import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l5-gen-med-2",
  lesson: 5,
  difficulty: "medel",
  instructions:
    "Skapa 'isDay'=false och 'hasLight'=true. Om isDay ELLER hasLight är true, skriv 'Kan se', annars 'Mörkt'.",
  starterCode:
    'bool isDay = ;\nbool hasLight = ;\nif (isDay || hasLight)\n{\n    Console.WriteLine("Kan se");\n}\nelse\n{\n    Console.WriteLine("Mörkt");\n}',
  expectedOutput: "Kan se",
  hint: "Använd || för ELLER-logik",
  tag: "Booleans",
};
