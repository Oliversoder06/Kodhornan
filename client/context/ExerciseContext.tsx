"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Exercise } from "shared/exercise.schema";
import { coreExercises, generatedTemplates } from "../lib/exercises";

interface ExerciseContextType {
  coreExercises: Exercise[];
  generatedExercises: Exercise[];
  allExercises: Exercise[];
  generateExercise: (day: number) => void;
  deleteExercise: (id: string) => void;
  getExercise: (id: string) => Exercise | undefined;
}

const ExerciseContext = createContext<ExerciseContextType | undefined>(undefined);

export function ExerciseProvider({ children }: { children: ReactNode }) {
  const [generatedExercises, setGeneratedExercises] = useState<Exercise[]>([]);

  const allExercises = [...coreExercises, ...generatedExercises];

  const generateExercise = (day: number) => {
    // 1. Find templates for the day
    const templates = generatedTemplates.filter((t) => t.lesson === day);
    if (templates.length === 0) {
      console.warn(`No templates found for day ${day}`);
      return;
    }

    // 2. Pick a random template
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)];

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

  return (
    <ExerciseContext.Provider
      value={{
        coreExercises,
        generatedExercises,
        allExercises,
        generateExercise,
        deleteExercise,
        getExercise,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
}

export function useExerciseContext() {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error("useExerciseContext must be used within an ExerciseProvider");
  }
  return context;
}
