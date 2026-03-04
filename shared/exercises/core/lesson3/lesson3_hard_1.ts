import type { Exercise } from "../../../exercise.schema";

export const exercise: Exercise = {
  id: "l3-svar-1",
  lesson: 3,
  difficulty: "svår",
  instructions:
    'Skriv ett program som kollar variabeln `tid` (värde 14). Skriv ut:\n- "God morgon" om tid < 12\n- "God eftermiddag" om tid >= 12 och tid < 18\n- "God kväll" annars',
  starterCode: `int tid = 14;

if (___)
{
    Console.WriteLine("God morgon");
}
else if (___)
{
    Console.WriteLine("God eftermiddag");
}
else
{
    Console.WriteLine("God kväll");
}`,
  expectedOutput: `God eftermiddag`,
  hints: [
    "Första villkoret: tid < 12",
    "Andra villkoret: tid >= 12 && tid < 18 (men eftersom vi redan vet att tid >= 12 från första if:en räcker det med tid < 18)",
  ],
  tag: "Jämförelser",
  concept: "Jämförelser",
};
