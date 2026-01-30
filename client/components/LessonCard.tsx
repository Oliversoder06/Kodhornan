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
  const { deleteExercise, generateExercise, isCompleted, readOnly, basePath } =
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
        href={`${basePath}/${exercise.id}`}
        className={`group min-h-30 p-4 relative flex flex-col gap-2 rounded-xl border backdrop-blur-md transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-lg overflow-visible
        ${
          completed
            ? "bg-green-500/5 border-green-500 hover:border-green-500 shadow-green-500/5 hover:shadow-green-500/10"
            : isGenerated
              ? "bg-slate-800/70 border-l-4 border-l-blue-500 border-t-white/5 border-r-white/5 border-b-white/5 hover:bg-slate-800/90 hover:shadow-blue-500/10"
              : "bg-slate-800/70 border-white/5 hover:border-slate-600 hover:bg-slate-800/90 hover:shadow-blue-500/10"
        }`}
      >
        {/* Decorative Top Line Gradient for non-generated/non-completed cards to match global style feel if needed, or keeping it clean */}
        {completed && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-50 inline-flex items-center gap-2 text-xs uppercase font-extrabold tracking-wider text-green-50 bg-gradient-to-r from-green-600 to-green-500 px-3 py-0.5 rounded-full shadow-lg ring-1 ring-green-700/40 transform transition-all duration-200 group-hover:-translate-y-0.5">
            <Check size={14} className="text-green-100" />
            KLAR
          </span>
        )}
        {/* Completed checkmark badge */}

        {/* Header Row: Properties */}
        <div className="flex justify-between items-start w-full">
          <div className="flex gap-2 items-center flex-wrap">
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 bg-black/20 px-2 py-0.5 rounded cursor-default">
              {exercise.difficulty}
            </div>
            {exercise.tag && (
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-slate-700/50 px-2 py-0.5 rounded border border-slate-700/50">
                {exercise.tag}
              </span>
            )}
          </div>

          {/* Generated Badge */}
          {isGenerated && (
            <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded transition-opacity group-hover:opacity-0 delay-100">
              Genererad
            </span>
          )}
        </div>

        {/* Main Content */}
        <div className="text-sm font-medium text-slate-200 mt-1 line-clamp-3 leading-relaxed">
          {exercise.instructions}
        </div>

        {/* Hover Action Overlay (Top Right) */}
        {isGenerated && !readOnly && (
          <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 duration-200 z-20">
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
