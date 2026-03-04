import type { Exercise } from "../../../exercise.schema";

export const exercise: Exercise = {
  id: "l3-latt-3",
  lesson: 3,
  difficulty: "lätt",
  instructions:
    'Variabeln `temperatur` har värdet 5. Skriv en if-sats som kollar om temperaturen är mindre än 10 och skriver ut "Det är kallt!".',
  starterCode: `int temperatur = 5;

if (___)
{
    Console.WriteLine("Det är kallt!");
}`,
  expectedOutput: `Det är kallt!`,
  hints: [
    "Använd < för att jämföra om något är mindre",
    "Villkoret ska vara: temperatur < 10",
  ],
  tag: "Jämförelser",
  concept: "Jämförelser",
};
