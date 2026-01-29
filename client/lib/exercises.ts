import { Exercise } from "shared/exercise.schema";
import { core, generated } from "shared/exercises";

// --- Core exercises (mandatory curriculum)
export const coreExercises: Exercise[] = Object.values(core);

// --- Generated Templates (read-only source)
// These are NOT active exercises. They are templates used to spawn new ones.
export const generatedTemplates: Exercise[] = Object.values(generated);

// Export only core exercises by default for server-side looking/static paths
export const allExercises: Exercise[] = [
  ...coreExercises,
];

// Helper to find core exercises (server-side mainly)
export function getCoreExerciseById(id: string): Exercise | undefined {
  return coreExercises.find((ex) => ex.id === id);
}

// @deprecated Use Context for full list including generated
export function getExerciseById(id: string): Exercise | undefined {
  return allExercises.find((ex) => ex.id === id);
}

export function groupCoreExercisesByDay() {
  const days: { day: number; exercises: Exercise[] }[] = [];

  coreExercises.forEach((ex) => {
    const day = ex.lesson;

    let dayGroup = days.find((d) => d.day === day);
    if (!dayGroup) {
      dayGroup = { day, exercises: [] };
      days.push(dayGroup);
    }

    dayGroup.exercises.push(ex);
  });

  return days.sort((a, b) => a.day - b.day);
}
