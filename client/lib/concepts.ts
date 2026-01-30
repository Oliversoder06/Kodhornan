/**
 * Concept definitions for progress tracking.
 * Each concept represents a learning milestone.
 */

export interface Concept {
  id: string;
  label: string;
  description?: string;
}

// The six core concepts taught in the curriculum
export const CONCEPTS: Concept[] = [
  { id: "Variabler", label: "Variabler", description: "Skapa och använda variabler" },
  { id: "Output", label: "Output (Console)", description: "Skriva ut text med Console.WriteLine" },
  { id: "Villkor", label: "Villkor (if / else)", description: "Göra val med if och else" },
  { id: "Jämförelser", label: "Jämförelser", description: "Jämföra värden med == och !=" },
  { id: "Loopar", label: "Loopar (for)", description: "Upprepa kod med for-loopar" },
  { id: "Metoder", label: "Metoder (void)", description: "Skapa egna funktioner" },
];

// Map tags from exercises to concept IDs
// This allows flexibility in how exercises are tagged
const TAG_TO_CONCEPT: Record<string, string> = {
  // Direct mappings
  "Variabler": "Variabler",
  "Variables": "Variabler",
  
  "Output": "Output",
  "Console": "Output",
  
  "Villkor": "Villkor",
  "If": "Villkor",
  "if/else": "Villkor",
  
  "Jämförelser": "Jämförelser",
  "Comparisons": "Jämförelser",
  
  "Loopar": "Loopar",
  "Loops": "Loopar",
  "for": "Loopar",
  "For": "Loopar",
  
  "Metoder": "Metoder",
  "Methods": "Metoder",
  "void": "Metoder",
};

/**
 * Get the concept ID for an exercise tag.
 * Returns undefined if the tag doesn't map to a concept.
 */
export function getConceptForTag(tag: string | undefined): string | undefined {
  if (!tag) return undefined;
  return TAG_TO_CONCEPT[tag];
}

/**
 * Get all concept IDs.
 */
export function getAllConceptIds(): string[] {
  return CONCEPTS.map(c => c.id);
}
