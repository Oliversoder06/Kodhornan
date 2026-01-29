'use client';

import { useExerciseContext } from "../context/ExerciseContext";
import { GenerateLessonButton } from "./GenerateLessonButton";
import { LessonCard } from "./LessonCard";
import { Exercise } from "shared/exercise.schema";

function groupExercisesByDay(exercises: Exercise[]) {
  const days: { day: number; exercises: Exercise[] }[] = [];

  exercises.forEach((ex) => {
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

export function ExerciseBoard() {
  const { allExercises } = useExerciseContext();
  const days = groupExercisesByDay(allExercises);

  return (
    <div className="days-grid">
      {days.map((day) => (
        <div key={day.day} className="day-section">
          <h2 className="text-2xl font-bold mb-4 pb-2">Lektion {day.day}</h2>
          <div className="exercise-cards">
            {day.exercises.map((exercise) => (
              <LessonCard key={exercise.id} exercise={exercise} />
            ))}
            <GenerateLessonButton day={day.day} />
          </div>
        </div>
      ))}
    </div>
  );
}
