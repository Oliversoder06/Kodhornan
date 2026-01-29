export type Exercise = {
  id: string;
  lesson: number;
  difficulty: "lätt" | "medel" | "svår";
  instructions: string;
  starterCode: string;
  expectedOutput: string;
  hint?: string;
  unlockKey?: string;
  tag?: string; // e.g. "Loopar", "Variabler", "Console"
};
