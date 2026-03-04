import type { Exercise } from "../../../exercise.schema";

export const exercise: Exercise = {
  id: "l3-medel-3",
  lesson: 3,
  difficulty: "medel",
  instructions:
    'Variabeln `betyg` har värdet 85. Använd if / else if / else för att skriva ut rätt meddelande:\n- Om betyg >= 90: "A"\n- Om betyg >= 70: "B"\n- Annars: "C"',
  starterCode: `int betyg = 85;

if (betyg >= 90)
{
    Console.WriteLine("A");
}
___ (betyg >= 70)
{
    Console.WriteLine("B");
}
else
{
    Console.WriteLine("C");
}`,
  expectedOutput: `B`,
  hints: [
    'Nyckelordet som saknas är "else if"',
    "else if kombinerar ett else med ett nytt villkor",
  ],
  tag: "Jämförelser",
  concept: "Jämförelser",
};
