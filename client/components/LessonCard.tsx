"use client";

import Link from "next/link";
import { useState } from "react";
import { Exercise } from "shared/exercise.schema";
import { useExerciseContext } from "../context/ExerciseContext";
import { ConfirmModal } from "./ConfirmModal";
import { RefreshCcw, Trash, Check } from "lucide-react";

interface LessonCardProps {
  exercise: Exercise;
}

export function LessonCard({ exercise }: LessonCardProps) {
  const { deleteExercise, generateExercise, isCompleted } =
    useExerciseContext();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const isGenerated =
    exercise.id.includes("-gen-") || exercise.id.startsWith("gen-");
  const completed = isCompleted(exercise.id);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      // Small delay for UI feel
      await new Promise((resolve) => setTimeout(resolve, 300));
      deleteExercise(exercise.id);
      // No navigation needed, it just disappears from the list
    } catch (error) {
      console.error("Failed to delete", error);
      setIsDeleting(false);
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  const handleRegenerate = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRegenerating(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Functionally, "regenerate" is just generate new + delete old, or just update.
      // But our context currently only supports generate-new (add) or delete.
      // For now, let's treat "regenerate" as delete + generate new for the same day.
      // OR better: Just generate a new one and delete the old one?
      // Simpler: Just trigger generation for the day and maybe delete this one if we want "replacement".

      // Actually, let's just delete the current one and generate a new one for the same day.
      deleteExercise(exercise.id);
      generateExercise(exercise.lesson);
    } catch (error) {
      console.error("Failed to regenerate", error);
    } finally {
      setIsRegenerating(false);
    }
  };

  return (
    <>
      <Link
        href={`/exercise/${exercise.id}`}
        className={`exercise-card group min-h-30 p-4 relative flex flex-col gap-2 ${isGenerated ? "border-l-4 border-l-blue-500" : ""} ${completed ? "border-2 border-green-500 bg-green-500/5" : ""}`}
      >
        {/* Completed checkmark badge */}
        {completed && (
          <div
            style={{
              position: "absolute",
              top: -8,
              right: -8,
              width: 28,
              height: 28,
              backgroundColor: "#22c55e",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            <Check size={16} color="white" strokeWidth={3} />
          </div>
        )}
        {/* Header Row: Properties */}
        <div className="flex justify-between items-start w-full">
          <div className="flex gap-4 items-center flex-wrap ">
            <div className="exercise-difficulty capitalize px-2 py-0.5">
              {exercise.difficulty}
            </div>
            {exercise.tag && (
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700/50">
                {exercise.tag}
              </span>
            )}
          </div>

          {/* Generated Badge - Always visible unless hovered (actions take precedence) */}
          {isGenerated && (
            <span className="text-[10px] uppercase font-bold tracking-wider text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full transition-opacity group-hover:opacity-0">
              Genererad
            </span>
          )}
        </div>

        {/* Main Content */}
        <div className="exercise-title text-sm text-slate-300 mt-1 line-clamp-3">
          {exercise.instructions}
        </div>

        {/* Hover Action Overlay (Top Right) */}
        {isGenerated && (
          <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
            <button
              onClick={handleRegenerate}
              disabled={isRegenerating || isDeleting}
              className="p-1.5 bg-slate-800 text-slate-400 hover:text-blue-400 hover:bg-slate-700 rounded-md transition-colors shadow-lg border border-slate-700 cursor-pointer"
              title="Generera om"
            >
              {isRegenerating ? (
                <RefreshCcw size={16} className="animate-spin" />
              ) : (
                <RefreshCcw size={16} />
              )}
            </button>
            <button
              onClick={handleDelete}
              disabled={isRegenerating || isDeleting}
              className="p-1.5 bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-md transition-colors shadow-lg border border-slate-700 cursor-pointer"
              title="Ta bort"
            >
              <Trash size={16} />
            </button>
          </div>
        )}
      </Link>

      <ConfirmModal
        isOpen={showDeleteConfirm}
        title="Ta bort övning"
        message="Är du säker på att du vill ta bort den här genererade övningen?"
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
        isLoading={isDeleting}
        confirmText="Ta bort"
        cancelText="Avbryt"
      />
    </>
  );
}
