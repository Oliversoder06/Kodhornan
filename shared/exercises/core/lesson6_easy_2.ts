import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l6-easy-2",
  lesson: 6,
  difficulty: "lätt",
  instructions: "Skapa en for-loop som skriver ut 'Hej!' 3 gånger.",
  starterCode: 'for (int i = 0; i  3; i++)\n{\n    Console.WriteLine("");\n}',
  expectedOutput: "Hej!\nHej!\nHej!",
  hint: "Loopa från 0 till 3 och skriv ut samma text varje gång",
  tag: "Loopar",
};
