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
}

const ExerciseContext = createContext<ExerciseContextType | undefined>(
  undefined,
);

export function ExerciseProvider({ children }: { children: ReactNode }) {
  const [generatedExercises, setGeneratedExercises] = useState<Exercise[]>([]);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);

  // Fetch completed exercises on mount
  useEffect(() => {
    async function fetchProgress() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        const completed = await getCompletedExercises(session.user.id);
        setCompletedExercises(completed);
      }
    }
    fetchProgress();

    // Listen for auth changes
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
  }, []);

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
