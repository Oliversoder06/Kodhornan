import type { Exercise } from "../../../exercise.schema";

export const exercise: Exercise = {
  id: "l3-medel-2",
  lesson: 3,
  difficulty: "medel",
  instructions:
    'Variabeln `hastighet` har värdet 120. Skriv en if-else-sats: om hastigheten är större än 110, skriv ut "För fort!", annars skriv ut "OK hastighet".',
  starterCode: `int hastighet = 120;

if (___)
{
    Console.WriteLine(___);
}
else
{
    Console.WriteLine("OK hastighet");
}`,
  expectedOutput: `För fort!`,
  hints: [
    "Använd > för att jämföra om något är större",
    'Fyll i båda luckorna: villkoret och texten "För fort!"',
  ],
  tag: "Jämförelser",
  concept: "Jämförelser",
};
