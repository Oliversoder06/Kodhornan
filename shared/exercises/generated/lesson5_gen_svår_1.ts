import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l5-gen-svår-1",
  lesson: 5,
  difficulty: "svår",
  instructions:
    "Skapa ett säkerhetssystem: hasPassword=true, hasFingerprint=false, isAdmin=true. Om (hasPassword ELLER hasFingerprint) OCH isAdmin, skriv 'Åtkomst beviljad', annars 'Nekad'.",
  starterCode:
    'bool hasPassword = ;\nbool hasFingerprint = ;\nbool isAdmin = ;\nif ((hasPassword || hasFingerprint) && isAdmin)\n{\n    Console.WriteLine("Åtkomst beviljad");\n}\nelse\n{\n    Console.WriteLine("Nekad");\n}',
  expectedOutput: "Åtkomst beviljad",
  hint: "Kombinera || och && med parenteser för rätt logik",
  tag: "Booleans",
};
