"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { Exercise } from "shared/exercise.schema";
import { coreExercises as fileCoreExercises } from "../lib/exercises";
import { getCompletedExercises, markExerciseComplete } from "../lib/progress";
import { supabase } from "../lib/supabase";
import { sortExercisesForDisplay } from "../lib/exercise-sorting";
import { getAllExercises } from "../actions/exercises";

interface ExerciseContextType {
  exercises: Exercise[];
  allExercises: Exercise[];
  completedExercises: string[];
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
  // Loading state
  isLoading: boolean;
  // Refresh exercises from database
  refreshExercises: () => Promise<void>;
  // Legacy compatibility
  coreExercises: Exercise[];
  generatedExercises: Exercise[];
  generateExercise: (day: number) => void;
  deleteExercise: (id: string) => void;
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
  basePath = "/exercise",
}: ExerciseProviderProps) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch exercises from database (or fallback to file-based)
  const refreshExercises = useCallback(async () => {
    setIsLoading(true);
    try {
      const dbExercises = await getAllExercises();

      // If database has exercises, use them; otherwise fallback to file-based
      if (dbExercises.length > 0) {
        setExercises(dbExercises);
      } else {
        // Fallback to file-based exercises for backwards compatibility
        setExercises(fileCoreExercises);
      }
    } catch (error) {
      console.error("Error fetching exercises:", error);
      // Fallback to file-based exercises on error
      setExercises(fileCoreExercises);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch of exercises
  useEffect(() => {
    refreshExercises();
  }, [refreshExercises]);

  // Fetch completed exercises based on user context
  useEffect(() => {
    async function fetchProgress() {
      if (forcedUserId) {
        // Admin View: Fetch specific user
        const completed = await getCompletedExercises(forcedUserId);
        setCompletedExercises(completed);
      } else {
        // Normal View: Fetch logged in user
        const {
          data: { session },
        } = await supabase.auth.getSession();
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

  // allExercises is now the same as exercises (database-driven)
  const allExercises = exercises;

  // Legacy compatibility: no-op functions for old API
  const generateExercise = (day: number) => {
    console.warn(
      "generateExercise is deprecated - use admin dashboard to create exercises",
    );
  };

  const deleteExercise = (id: string) => {
    console.warn(
      "deleteExercise is deprecated - use admin dashboard to delete exercises",
    );
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
    const lessonExercises = exercises.filter((ex) => ex.lesson === lesson);
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
    const lessons = [...new Set(exercises.map((ex) => ex.lesson))].sort(
      (a, b) => a - b,
    );
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
        exercises,
        allExercises,
        completedExercises,
        getExercise,
        markComplete,
        isCompleted,
        getNextExercise,
        getNextLesson,
        isLastExerciseInLesson,
        getLessonExercises,
        readOnly,
        basePath,
        isLoading,
        refreshExercises,
        // Legacy compatibility
        coreExercises: exercises,
        generatedExercises: [],
        generateExercise,
        deleteExercise,
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
