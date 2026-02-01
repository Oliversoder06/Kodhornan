"use client";

import { useExerciseContext } from "../context/ExerciseContext";
// import { GenerateLessonButton } from "./GenerateLessonButton";
import { LessonCard } from "./LessonCard";
import { Exercise } from "shared/exercise.schema";
import { sortExercisesForDisplay } from "../lib/exercise-sorting";

type TagGroup = {
  tag: string;
  exercises: Exercise[];
};

type LessonGroup = {
  lesson: number;
  tagGroups: TagGroup[];
};

function groupExercisesByLessonAndTag(exercises: Exercise[]): LessonGroup[] {
  // 1. Group by Lesson
  const lessonMap = new Map<number, Exercise[]>();
  exercises.forEach((ex) => {
    if (!lessonMap.has(ex.lesson)) {
      lessonMap.set(ex.lesson, []);
    }
    lessonMap.get(ex.lesson)!.push(ex);
  });

  // 2. For each lesson, group by Tag and Sort
  const lessonGroups: LessonGroup[] = [];
  
  lessonMap.forEach((lessonExercises, lesson) => {
    // Sort all exercises in this lesson using the shared logic first
    const sortedExercises = sortExercisesForDisplay(lessonExercises);
    
    // Now group them by tag, preserving the sorted order
    const tagMap = new Map<string, Exercise[]>();
    
    // Since sortedExercises is already sorted by Tag -> Difficulty,
    // iterating through it will process tags in the correct order naturally.
    sortedExercises.forEach((ex) => {
        const tag = ex.tag || "Övrigt";
        if (!tagMap.has(tag)) {
            tagMap.set(tag, []);
        }
        tagMap.get(tag)!.push(ex);
    });

    const tagGroups: TagGroup[] = [];
    tagMap.forEach((groupExercises, tag) => {
        tagGroups.push({ tag, exercises: groupExercises });
    });

    lessonGroups.push({ lesson, tagGroups });
  });

  return lessonGroups.sort((a, b) => a.lesson - b.lesson);
}

export function ExerciseBoard() {
  const { allExercises, readOnly } = useExerciseContext();
  const lessonGroups = groupExercisesByLessonAndTag(allExercises);

  return (
    <div className="days-grid">
      {lessonGroups.map((lessonGroup) => (
        <div key={lessonGroup.lesson} className="day-section">
          <h2 className="text-2xl font-bold mb-4 pb-2">
            Lektion {lessonGroup.lesson}
          </h2>

          {lessonGroup.tagGroups.map((tagGroup) => (
            <div key={tagGroup.tag} className="mb-6">
              <h3 className="text-lg font-semibold text-slate-400 mb-3 flex items-center gap-2">
                <span className="text-xs uppercase font-bold tracking-wider text-slate-500 bg-slate-800 px-2 py-1 rounded">
                  {tagGroup.tag}
                </span>
              </h3>
              <div className="exercise-cards">
                {tagGroup.exercises.map((exercise) => (
                  <LessonCard key={exercise.id} exercise={exercise} />
                ))}
              </div>
            </div>
          ))}
          {/* {!readOnly && <GenerateLessonButton day={lessonGroup.lesson} />} */}
        </div>
      ))}
    </div>
  );
}
