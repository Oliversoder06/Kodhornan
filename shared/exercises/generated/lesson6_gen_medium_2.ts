import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l6-gen-med-2",
  lesson: 6,
  difficulty: "medel",
  instructions:
    "Använd en for-loop för att skriva ut alla jämna tal från 2 till 10 (2, 4, 6, 8, 10).",
  starterCode: "for (int i = ; i  ; i  )\n{\n    Console.WriteLine(i);\n}",
  expectedOutput: "2\n4\n6\n8\n10",
  hint: "Börja på 2 och öka med i += 2 varje iteration",
  tag: "Loopar",
};
