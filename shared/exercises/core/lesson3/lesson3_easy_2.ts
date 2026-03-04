import type { Exercise } from "../../../exercise.schema";

export const exercise: Exercise = {
  id: "l3-latt-2",
  lesson: 3,
  difficulty: "lätt",
  instructions:
    'Variabeln `poäng` har värdet 100. Skriv en if-sats som kollar om poäng är lika med 100 och skriver ut "Perfekt!".',
  starterCode: `int poäng = 100;

if (___)
{
    Console.WriteLine("Perfekt!");
}`,
  expectedOutput: `Perfekt!`,
  hints: [
    "Använd == för att jämföra om två värden är lika",
    "Villkoret ska vara: poäng == 100",
  ],
  tag: "Jämförelser",
  concept: "Jämförelser",
};
