import type { Exercise } from "../../../exercise.schema";

export const exercise: Exercise = {
  id: "l3-svar-3",
  lesson: 3,
  difficulty: "svår",
  instructions:
    'Variabeln `pengar` har värdet 250 och `pris` har värdet 200. Skriv hela programmet själv:\n- Om pengar >= pris: skriv ut "Köp genomfört" och sedan "Växel: X" där X är pengar - pris\n- Annars: skriv ut "Inte tillräckligt"',
  starterCode: `int pengar = 250;
int pris = 200;

___`,
  expectedOutput: `Köp genomfört
Växel: 50`,
  hints: [
    "Börja med if (pengar >= pris)",
    "Använd (pengar - pris) för att räkna ut växeln",
    'Console.WriteLine("Växel: " + (pengar - pris));',
  ],
  tag: "Jämförelser",
  concept: "Jämförelser",
};
