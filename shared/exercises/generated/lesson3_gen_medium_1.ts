import { Exercise } from "../../exercise.schema";

export const exercise: Exercise = {
  id: "l3-gen-med-1",
  lesson: 3,
  difficulty: "medel",
  instructions:
    "Skapa en variabel 'poäng' med värdet 50. Använd += för att lägga till 20, sedan += för att lägga till 30 till. Skriv ut slutresultatet.",
  starterCode:
    "int poäng = 50;\npoäng  20;\npoäng  30;\nConsole.WriteLine(poäng);",
  expectedOutput: "100",
  hint: "Du kan använda += flera gånger efter varandra",
  tag: "Matematik",
};
