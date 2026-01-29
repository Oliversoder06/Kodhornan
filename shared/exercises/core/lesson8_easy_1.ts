import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l8-easy-1",
  lesson: 8,
  difficulty: "lätt",
  instructions:
    "Skapa en metod som heter 'Hälsa' som skriver ut 'Hej!' och anropa den.",
  starterCode: 'void Hälsa()\n{\n    Console.WriteLine("");\n}\n\nHälsa();',
  expectedOutput: "Hej!",
  hint: "Skriv ut texten i metoden och anropa den sedan",
  tag: "Metoder",
};
