import type { Exercise } from "../../../exercise.schema";

export const exercise: Exercise = {
  id: "l3-svar-2",
  lesson: 3,
  difficulty: "svår",
  instructions:
    'Variablerna `x` och `y` har värdena 15 och 20. Skriv if-satser som skriver ut:\n- "x är störst" om x > y\n- "y är störst" om y > x\n- "Lika!" om de är lika\n\nFyll i alla tre villkoren.',
  starterCode: `int x = 15;
int y = 20;

if (___)
{
    Console.WriteLine("x är störst");
}
else if (___)
{
    Console.WriteLine("y är störst");
}
else
{
    Console.WriteLine("Lika!");
}`,
  expectedOutput: `y är störst`,
  hints: [
    "Jämför x och y med > och <",
    "Första villkoret: x > y, andra: y > x",
  ],
  tag: "Jämförelser",
  concept: "Jämförelser",
};
