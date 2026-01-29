"use client";

import { useState } from "react";
import { useExerciseContext } from "../context/ExerciseContext";
import { ConfirmModal } from "./ConfirmModal";

export function GenerateLessonButton({ day }: { day: number }) {
  const { generateExercise } = useExerciseContext();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleConfirm = async () => {
    setIsGenerating(true);
    try {
      // Simulate network delay for feel
      await new Promise((resolve) => setTimeout(resolve, 500));
      generateExercise(day);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
      setShowModal(false);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={isGenerating}
        className="flex items-center justify-center border-2 border-dashed border-slate-700 hover:border-blue-500 hover:bg-slate-800/50 transition-all group cursor-pointer min-h-30 rounded-xl"
        title="Generera ny övning"
      >
        {isGenerating ? (
          <span className="animate-spin text-xl text-blue-500">↻</span>
        ) : (
          <span className="text-4xl text-slate-500 group-hover:text-blue-500 font-light transition-colors">
            +
          </span>
        )}
      </button>

      <ConfirmModal
        isOpen={showModal}
        title="Generera ny övning"
        message={`Vill du generera en ny övning för dag ${day}?`}
        onConfirm={handleConfirm}
        onCancel={() => setShowModal(false)}
        isLoading={isGenerating}
      />
    </>
  );
}
