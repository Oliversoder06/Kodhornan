export type Exercise = {
  id: string;
  lesson: number;
  difficulty: "easy" | "medium" | "hard";
  instructions: string;
  starterCode: string;
  expectedOutput: string;
  hint?: string;
  unlockKey?: string
};
