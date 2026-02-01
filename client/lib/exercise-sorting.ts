import { Exercise } from "shared/exercise.schema";
import { tagOrder } from "./tagOrder";

const difficultyOrder: Record<string, number> = {
  lätt: 1,
  medel: 2,
  svår: 3,
};

/**
 * Sorts exercises for consistent display order across the app.
 * Order: Tag (by tagOrder) -> Difficulty (Easy > Med > Hard) -> Alphabetical by ID (fallback)
 */
export function sortExercisesForDisplay(exercises: Exercise[]): Exercise[] {
  return [...exercises].sort((a, b) => {
    const tagA = a.tag || "Övrigt";
    const tagB = b.tag || "Övrigt";

    // 1. Sort by Tag
    if (tagA !== tagB) {
      if (tagA === "Övrigt") return 1;
      if (tagB === "Övrigt") return -1;

      const indexA = tagOrder.indexOf(tagA);
      const indexB = tagOrder.indexOf(tagB);

      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      
      return tagA.localeCompare(tagB, "sv");
    }

    // 2. Sort by Difficulty within same tag
    const diffA = difficultyOrder[a.difficulty] ?? 99;
    const diffB = difficultyOrder[b.difficulty] ?? 99;
    
    if (diffA !== diffB) {
      return diffA - diffB;
    }

    // 3. Fallback: Stable sort by ID
    return a.id.localeCompare(b.id);
  });
}
