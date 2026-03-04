import type { Exercise } from "../../../exercise.schema";

export const exercise: Exercise = {
  id: "l3-latt-1",
  lesson: 3,
  difficulty: "lätt",
  instructions:
    'Variabeln `ålder` har värdet 20. Skriv en if-sats som kollar om ålder är större än 18 och i så fall skriver ut "Välkommen!".',
  starterCode: `int ålder = 20;

if (___)
{
    Console.WriteLine("Välkommen!");
}`,
  expectedOutput: `Välkommen!`,
  hints: [
    "Använd > för att jämföra om något är större",
    "Villkoret ska vara: ålder > 18",
  ],
  tag: "Jämförelser",
  concept: "Jämförelser",
};
