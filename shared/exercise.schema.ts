export type Concept = "Variabler" | "Output" | "Villkor" | "Jämförelser" | "Loopar" | "Metoder";

export type Exercise = {
  id: string;
  title?: string;
  lesson: number;
  difficulty: "lätt" | "medel" | "svår";
  instructions: string;
  starterCode: string;
  expectedOutput: string;
  hint?: string; // Single hint (backward compat)
  hints?: string[]; // Progressive hints array
  unlockKey?: string;
  tag?: string; // e.g. "Loopar", "Variabler", "Console"
  concept?: Concept; // Direct concept mapping
};
