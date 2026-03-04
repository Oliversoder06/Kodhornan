import type { Exercise } from "../../../exercise.schema";

export const exercise: Exercise = {
  id: "l3-medel-1",
  lesson: 3,
  difficulty: "medel",
  instructions:
    'Variabeln `hp` har värdet 0. Skriv en if-else-sats: om hp är mindre eller lika med 0, skriv ut "Game Over", annars skriv ut "Du lever!".',
  starterCode: `int hp = 0;

if (___)
{
    Console.WriteLine("Game Over");
}
else
{
    Console.WriteLine("Du lever!");
}`,
  expectedOutput: `Game Over`,
  hints: ["Mindre eller lika med skrivs <=", "Villkoret ska vara: hp <= 0"],
  tag: "Jämförelser",
  concept: "Jämförelser",
};
