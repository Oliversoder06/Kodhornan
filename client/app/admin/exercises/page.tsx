"use client";

import { useState } from "react";
import Link from "next/link";
import { Exercise } from "shared/exercise.schema";
import { ExerciseManager } from "@/components/ExerciseManager";
import { ExerciseForm } from "@/components/ExerciseForm";

export default function AdminExercisesPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const [defaultLesson, setDefaultLesson] = useState<number | undefined>();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEditExercise = (exercise: Exercise) => {
    setEditingExercise(exercise);
    setDefaultLesson(undefined);
    setShowForm(true);
  };

  const handleCreateExercise = (lesson?: number) => {
    setEditingExercise(null);
    setDefaultLesson(lesson);
    setShowForm(true);
  };

  const handleFormSave = () => {
    setShowForm(false);
    setEditingExercise(null);
    setDefaultLesson(undefined);
    // Trigger refresh of ExerciseManager
    setRefreshKey((prev) => prev + 1);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingExercise(null);
    setDefaultLesson(undefined);
  };

  return (
    <div className="h-screen bg-slate-950 text-slate-200 p-8 flex flex-col overflow-hidden">
      <div className="max-w-[1600px] mx-auto w-full flex flex-col flex-1 min-h-0">
        {/* Header */}
        <header className="flex justify-between items-center mb-6 border-b border-slate-800 pb-6 shrink-0">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/dashboard"
              className="text-slate-400 hover:text-white p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Övningar
            </h1>
          </div>
          <Link
            href="/admin/dashboard"
            className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
          >
            Tillbaka till dashboard
          </Link>
        </header>

        {/* Exercise Manager */}
        <div className="flex-1 min-h-0">
          <ExerciseManager
            key={refreshKey}
            onEditExercise={handleEditExercise}
            onCreateExercise={handleCreateExercise}
          />
        </div>

        {/* Exercise Form Modal */}
        {showForm && (
          <ExerciseForm
            exercise={editingExercise}
            defaultLesson={defaultLesson}
            onSave={handleFormSave}
            onCancel={handleFormCancel}
          />
        )}
      </div>
    </div>
  );
}
