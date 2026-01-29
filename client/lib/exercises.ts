import { Exercise } from "shared/exercise.schema";
import { core, generated } from "shared/exercises";

// --- Core exercises (mandatory curriculum)
const l1e1 = core.lesson1_easy_1;
const l1e2 = core.lesson1_easy_2;
const l1m1 = core.lesson1_medium_1;

// --- Generated exercises (optional practice)
const l1g1 = generated.lesson1_gen_1;
const l2g1 = generated.lesson2_gen_1;

export const coreExercises: Exercise[] = [
  l1e1,
  l1e2,
  l1m1,
];

export const generatedExercises: Exercise[] = [
  l1g1,
  l2g1,
];

export const allExercises: Exercise[] = [
  ...coreExercises,
  ...generatedExercises,
];

export function getExerciseById(id: string): Exercise | undefined {
  return allExercises.find((ex) => ex.id === id);
}

export function groupExercisesByDay() {
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
