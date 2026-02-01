"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Exercise } from "shared/exercise.schema";
import { coreExercises, generatedTemplates } from "../lib/exercises";
import { getCompletedExercises, markExerciseComplete } from "../lib/progress";
import { supabase } from "../lib/supabase";
import { sortExercisesForDisplay } from "../lib/exercise-sorting";

interface ExerciseContextType {
  coreExercises: Exercise[];
  generatedExercises: Exercise[];
  allExercises: Exercise[];
  completedExercises: string[];
  generateExercise: (day: number) => void;
  deleteExercise: (id: string) => void;
  getExercise: (id: string) => Exercise | undefined;
  markComplete: (exerciseId: string) => Promise<void>;
  isCompleted: (exerciseId: string) => boolean;
  // Navigation helpers
  getNextExercise: (currentId: string) => Exercise | null;
  getNextLesson: (currentLesson: number) => number | null;
  isLastExerciseInLesson: (exerciseId: string) => boolean;
  getLessonExercises: (lesson: number) => Exercise[];
  // View mode
  readOnly: boolean;
  basePath: string;
}

const ExerciseContext = createContext<ExerciseContextType | undefined>(
  undefined,
);

interface ExerciseProviderProps {
  children: ReactNode;
  forcedUserId?: string;
  readOnly?: boolean;
  basePath?: string;
}

export function ExerciseProvider({ 
  children, 
  forcedUserId, 
  readOnly = false, 
  basePath = "/exercise" 
}: ExerciseProviderProps) {
  const [generatedExercises, setGeneratedExercises] = useState<Exercise[]>([]);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);

  // Fetch completed exercises based on user context
  useEffect(() => {
    async function fetchProgress() {
      if (forcedUserId) {
        // Admin View: Fetch specific user
        const completed = await getCompletedExercises(forcedUserId);
        setCompletedExercises(completed);
      } else {
        // Normal View: Fetch logged in user
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const completed = await getCompletedExercises(session.user.id);
          setCompletedExercises(completed);
        }
      }
    }
    fetchProgress();

    // Listen for auth changes only if not forced user
    if (!forcedUserId) {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
          const completed = await getCompletedExercises(session.user.id);
          setCompletedExercises(completed);
        } else {
          setCompletedExercises([]);
        }
      });
      return () => subscription.unsubscribe();
    }
  }, [forcedUserId]);

  const allExercises = [...coreExercises, ...generatedExercises];

  const generateExercise = (day: number) => {
    // 1. Find templates for the day
    const templates = generatedTemplates.filter((t) => t.lesson === day);
    if (templates.length === 0) {
      console.warn(`No templates found for day ${day}`);
      return;
    }

    // 2. Pick a random template
    const randomTemplate =
      templates[Math.floor(Math.random() * templates.length)];

    // 3. Clone and assign unique ID
    // ID format: l{day}-gen-{timestamp}
    // This distinguishes it clearly from core exercises which usually look like 'lesson1_easy_1'
    // We use the 'l{day}-gen-' prefix to ensure it matches the 'isGenerated' check (includes '-gen-')
    const newId = `l${day}-gen-${Date.now()}`;

    const newExercise: Exercise = {
      ...randomTemplate,
      id: newId,
      instructions: randomTemplate.instructions + " (Genererad)", // Optional indicator
    };

    setGeneratedExercises((prev) => [...prev, newExercise]);
  };

  const deleteExercise = (id: string) => {
    setGeneratedExercises((prev) => prev.filter((ex) => ex.id !== id));
  };

  const getExercise = (id: string) => {
    return allExercises.find((ex) => ex.id === id);
  };

  const markComplete = async (exerciseId: string) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session?.user) {
      const success = await markExerciseComplete(session.user.id, exerciseId);
      if (success && !completedExercises.includes(exerciseId)) {
        setCompletedExercises((prev) => [...prev, exerciseId]);
      }
    }
  };

  const isCompleted = (exerciseId: string) => {
    return completedExercises.includes(exerciseId);
  };

  // Navigation helpers
  const getLessonExercises = (lesson: number): Exercise[] => {
    const lessonExercises = coreExercises.filter((ex) => ex.lesson === lesson);
    return sortExercisesForDisplay(lessonExercises);
  };

  const getNextExercise = (currentId: string): Exercise | null => {
    const current = getExercise(currentId);
    if (!current) return null;

    const lessonExercises = getLessonExercises(current.lesson);
    const currentIndex = lessonExercises.findIndex((ex) => ex.id === currentId);
    
    if (currentIndex === -1) return null;
    if (currentIndex < lessonExercises.length - 1) {
      return lessonExercises[currentIndex + 1];
    }
    
    // Current is last in lesson, get first from next lesson
    const nextLessonExercises = getLessonExercises(current.lesson + 1);
    return nextLessonExercises.length > 0 ? nextLessonExercises[0] : null;
  };

  const getNextLesson = (currentLesson: number): number | null => {
    const lessons = [...new Set(coreExercises.map((ex) => ex.lesson))].sort((a, b) => a - b);
    const currentIndex = lessons.indexOf(currentLesson);
    if (currentIndex === -1 || currentIndex === lessons.length - 1) return null;
    return lessons[currentIndex + 1];
  };

  const isLastExerciseInLesson = (exerciseId: string): boolean => {
    const exercise = getExercise(exerciseId);
    if (!exercise) return false;
    
    const lessonExercises = getLessonExercises(exercise.lesson);
    return lessonExercises[lessonExercises.length - 1]?.id === exerciseId;
  };

  return (
    <ExerciseContext.Provider
      value={{
        coreExercises,
        generatedExercises,
        allExercises,
        completedExercises,
        generateExercise,
        deleteExercise,
        getExercise,
        markComplete,
        isCompleted,
        getNextExercise,
        getNextLesson,
        isLastExerciseInLesson,
        getLessonExercises,
        readOnly,
        basePath,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
}

export function useExerciseContext() {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error(
      "useExerciseContext must be used within an ExerciseProvider",
    );
  }
  return context;
}
