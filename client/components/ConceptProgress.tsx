"use client";

import { useExerciseContext } from "../context/ExerciseContext";
import { CONCEPTS, getConceptForTag } from "../lib/concepts";
import { Check, Clock } from "lucide-react";

/**
 * Displays concept-based progress as a checklist.
 * No percentages, no gamification - just clear status.
 */
export function ConceptProgress() {
  const { coreExercises, completedExercises } = useExerciseContext();

  // Calculate completion status for each concept
  const conceptStatus = CONCEPTS.map((concept) => {
    // Find all exercises for this concept
    const exercisesForConcept = coreExercises.filter((ex) => {
      // Check direct concept field first
      if (ex.concept === concept.id) return true;
      // Fall back to tag mapping
      return getConceptForTag(ex.tag) === concept.id;
    });

    // Count completed
    const completedCount = exercisesForConcept.filter((ex) =>
      completedExercises.includes(ex.id)
    ).length;

    const totalCount = exercisesForConcept.length;
    const isComplete = totalCount > 0 && completedCount === totalCount;
    const hasStarted = completedCount > 0;

    return {
      ...concept,
      isComplete,
      hasStarted,
      totalCount,
      completedCount,
    };
  });

  // Only show concepts that have exercises
  const activeConcepts = conceptStatus.filter((c) => c.totalCount > 0);

  if (activeConcepts.length === 0) {
    return null;
  }

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
      <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">
        Dina framsteg
      </h3>
      <ul className="space-y-2">
        {activeConcepts.map((concept) => (
          <li
            key={concept.id}
            className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
              concept.isComplete
                ? "bg-green-500/10 text-green-400"
                : concept.hasStarted
                  ? "bg-slate-800/50 text-slate-300"
                  : "text-slate-500"
            }`}
          >
            {concept.isComplete ? (
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <Check size={12} className="text-white" strokeWidth={3} />
              </div>
            ) : concept.hasStarted ? (
              <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                <Clock size={12} className="text-slate-400" />
              </div>
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-slate-700 flex-shrink-0" />
            )}
            <span className="text-sm font-medium">{concept.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
