"use client";

import { useState, useEffect, useCallback, DragEvent } from "react";
import { Exercise } from "shared/exercise.schema";
import {
  getAllExercises,
  reorderExercisesInLesson,
  deleteExercise as deleteExerciseAction,
  bulkMoveExercisesToLesson,
  bulkDeleteExercises,
} from "../actions/exercises";
import { sortExercisesForDisplay } from "../lib/exercise-sorting";

interface LessonGroup {
  lesson: number;
  exercises: Exercise[];
}

interface ExerciseManagerProps {
  onEditExercise: (exercise: Exercise) => void;
  onCreateExercise: (lesson?: number) => void;
}

export function ExerciseManager({
  onEditExercise,
  onCreateExercise,
}: ExerciseManagerProps) {
  const [lessons, setLessons] = useState<LessonGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [draggedExercise, setDraggedExercise] = useState<Exercise | null>(null);
  const [dragOverLesson, setDragOverLesson] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const loadExercises = useCallback(async () => {
    setLoading(true);
    const exercises = await getAllExercises();

    // Group exercises by lesson
    const grouped = new Map<number, Exercise[]>();
    for (const ex of exercises) {
      const list = grouped.get(ex.lesson) || [];
      list.push(ex);
      grouped.set(ex.lesson, list);
    }

    // Convert to sorted array
    const lessonGroups: LessonGroup[] = Array.from(grouped.entries())
      .map(([lesson, exercises]) => ({ lesson, exercises }))
      .sort((a, b) => a.lesson - b.lesson);

    setLessons(lessonGroups);
    setLoading(false);
  }, []);

  useEffect(() => {
    let mounted = true;

    getAllExercises().then((exercises) => {
      if (!mounted) return;

      // Group exercises by lesson
      const grouped = new Map<number, Exercise[]>();
      for (const ex of exercises) {
        const list = grouped.get(ex.lesson) || [];
        list.push(ex);
        grouped.set(ex.lesson, list);
      }

      // Convert to sorted array
      const lessonGroups: LessonGroup[] = Array.from(grouped.entries())
        .map(([lesson, exercises]) => ({ lesson, exercises }))
        .sort((a, b) => a.lesson - b.lesson);

      setLessons(lessonGroups);
      setLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const handleDragStart = (e: DragEvent, exercise: Exercise) => {
    // If dragging a selected item, we'll move all selected
    // If dragging an unselected item, just move that one
    if (!selectedIds.has(exercise.id)) {
      setSelectedIds(new Set([exercise.id]));
    }
    setDraggedExercise(exercise);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", exercise.id);

    // Add visual feedback
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.classList.add("opacity-50");
    }
  };

  const handleDragEnd = (e: DragEvent) => {
    setDraggedExercise(null);
    setDragOverLesson(null);
    setDragOverIndex(null);

    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.classList.remove("opacity-50");
    }
  };

  const handleDragOver = (e: DragEvent, lesson: number, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverLesson(lesson);
    setDragOverIndex(index);
  };

  const handleDragLeave = (e: DragEvent) => {
    // Only clear if leaving the drop zone entirely
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (!relatedTarget?.closest("[data-dropzone]")) {
      setDragOverLesson(null);
      setDragOverIndex(null);
    }
  };

  const handleDrop = async (
    e: DragEvent,
    targetLesson: number,
    targetIndex: number,
  ) => {
    e.preventDefault();

    if (!draggedExercise || isUpdating) return;

    setIsUpdating(true);
    setDragOverLesson(null);
    setDragOverIndex(null);

    const idsToMove =
      selectedIds.size > 0 ? Array.from(selectedIds) : [draggedExercise.id];

    // Check if all selected are from the same lesson as target
    const allFromTargetLesson = idsToMove.every((id) => {
      const ex = lessons.flatMap((l) => l.exercises).find((e) => e.id === id);
      return ex?.lesson === targetLesson;
    });

    if (allFromTargetLesson && idsToMove.length === 1) {
      // Single item reorder within same lesson
      const lessonExercises =
        lessons.find((l) => l.lesson === targetLesson)?.exercises || [];
      const currentIndex = lessonExercises.findIndex(
        (ex) => ex.id === draggedExercise.id,
      );

      if (currentIndex !== targetIndex) {
        const newOrder = [...lessonExercises];
        newOrder.splice(currentIndex, 1);
        newOrder.splice(
          targetIndex > currentIndex ? targetIndex - 1 : targetIndex,
          0,
          draggedExercise,
        );

        const exerciseIds = newOrder.map((ex) => ex.id);
        await reorderExercisesInLesson(targetLesson, exerciseIds);
      }
    } else {
      // Bulk move to different lesson (or multiple items)
      await bulkMoveExercisesToLesson(idsToMove, targetLesson);
    }

    setSelectedIds(new Set());
    await loadExercises();
    setIsUpdating(false);
  };

  const toggleSelection = (exerciseId: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(exerciseId)) {
        newSet.delete(exerciseId);
      } else {
        newSet.add(exerciseId);
      }
      return newSet;
    });
  };

  const clearSelection = () => {
    setSelectedIds(new Set());
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;

    if (
      !confirm(
        `Är du säker på att du vill ta bort ${selectedIds.size} övningar?`,
      )
    ) {
      return;
    }

    setIsUpdating(true);
    await bulkDeleteExercises(Array.from(selectedIds));
    setSelectedIds(new Set());
    await loadExercises();
    setIsUpdating(false);
  };

  const handleDeleteExercise = async (exercise: Exercise) => {
    if (
      !confirm(`Är du säker på att du vill ta bort övningen "${exercise.id}"?`)
    ) {
      return;
    }

    setIsUpdating(true);
    await deleteExerciseAction(exercise.id);
    await loadExercises();
    setIsUpdating(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "lätt":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "medel":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "svår":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  const addNewLesson = () => {
    const maxLesson =
      lessons.length > 0 ? Math.max(...lessons.map((l) => l.lesson)) : 0;
    const newLesson = maxLesson + 1;
    // Add empty lesson placeholder for drag-and-drop
    setLessons((prev) => [...prev, { lesson: newLesson, exercises: [] }]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-pulse text-slate-400">Laddar övningar...</div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 shrink-0">
        <h2 className="text-xl font-bold text-white">Övningshantering</h2>
        <div className="flex items-center gap-3">
          {selectedIds.size > 0 && (
            <>
              <span className="text-sm text-slate-400">
                {selectedIds.size} markerade
              </span>
              <button
                onClick={clearSelection}
                className="px-3 py-1.5 text-sm text-slate-400 hover:text-white transition-colors"
              >
                Avmarkera
              </button>
              <button
                onClick={handleBulkDelete}
                disabled={isUpdating}
                className="px-3 py-1.5 text-sm bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                Ta bort ({selectedIds.size})
              </button>
            </>
          )}
          <button
            onClick={() => onCreateExercise()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
          >
            + Ny övning
          </button>
        </div>
      </div>

      {/* Lesson columns */}
      <div
        className="grid gap-6 flex-1 min-h-0"
        style={{
          gridTemplateColumns: `repeat(auto-fill, minmax(320px, 1fr))`,
          alignItems: "start",
        }}
      >
        {lessons.map((lessonGroup) => (
          <div
            key={lessonGroup.lesson}
            data-dropzone
            className={`bg-slate-900 border rounded-xl p-4 transition-colors flex flex-col max-h-[calc(100vh-200px)] ${
              dragOverLesson === lessonGroup.lesson
                ? "border-blue-500 bg-blue-500/5"
                : "border-slate-800"
            }`}
            onDragOver={(e) =>
              handleDragOver(
                e,
                lessonGroup.lesson,
                lessonGroup.exercises.length,
              )
            }
            onDragLeave={handleDragLeave}
            onDrop={(e) =>
              handleDrop(e, lessonGroup.lesson, lessonGroup.exercises.length)
            }
          >
            {/* Lesson Header */}
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-800 shrink-0">
              <h3 className="text-lg font-bold text-white">
                Dag {lessonGroup.lesson}
              </h3>
              <span className="text-sm text-slate-500">
                {lessonGroup.exercises.length} övningar
              </span>
            </div>

            {/* Exercise list - sorted by tag, then difficulty, then ID */}
            <div className="space-y-2 min-h-[100px] flex-1 overflow-y-auto">
              {(() => {
                const sortedExercises = sortExercisesForDisplay(
                  lessonGroup.exercises,
                );
                let lastTag: string | null = null;

                return sortedExercises.map((exercise, index) => {
                  const currentTag = exercise.tag || "Övrigt";
                  const showDivider =
                    lastTag !== null && lastTag !== currentTag;
                  lastTag = currentTag;

                  return (
                    <div key={exercise.id}>
                      {/* Tag section divider */}
                      {showDivider && (
                        <div className="flex items-center gap-2 pt-3 pb-2">
                          <div className="flex-1 h-px bg-slate-700" />
                          <span className="text-xs text-slate-500 font-medium">
                            {currentTag}
                          </span>
                          <div className="flex-1 h-px bg-slate-700" />
                        </div>
                      )}
                      {/* First tag label */}
                      {index === 0 && (
                        <div className="flex items-center gap-2 pb-2">
                          <span className="text-xs text-slate-500 font-medium">
                            {currentTag}
                          </span>
                          <div className="flex-1 h-px bg-slate-700" />
                        </div>
                      )}
                      {/* Drop indicator */}
                      {dragOverLesson === lessonGroup.lesson &&
                        dragOverIndex === index && (
                          <div className="h-1 bg-blue-500 rounded-full mb-2 animate-pulse" />
                        )}

                      <div
                        draggable
                        onDragStart={(e) => handleDragStart(e, exercise)}
                        onDragEnd={handleDragEnd}
                        onDragOver={(e) =>
                          handleDragOver(e, lessonGroup.lesson, index)
                        }
                        className={`group p-3 bg-slate-800 border rounded-lg cursor-grab active:cursor-grabbing hover:border-slate-600 transition-all ${
                          draggedExercise?.id === exercise.id
                            ? "opacity-50"
                            : ""
                        } ${
                          selectedIds.has(exercise.id)
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-slate-700"
                        }`}
                      >
                        <div className="flex justify-between items-start gap-2">
                          {/* Checkbox */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSelection(exercise.id);
                            }}
                            className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                              selectedIds.has(exercise.id)
                                ? "bg-blue-500 border-blue-500"
                                : "border-slate-600 hover:border-slate-500"
                            }`}
                          >
                            {selectedIds.has(exercise.id) && (
                              <svg
                                className="w-3 h-3 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </button>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className={`text-xs px-2 py-0.5 rounded border ${getDifficultyColor(exercise.difficulty)}`}
                              >
                                {exercise.difficulty}
                              </span>
                              {exercise.tag && (
                                <span className="text-xs px-2 py-0.5 rounded bg-slate-700 text-slate-400">
                                  {exercise.tag}
                                </span>
                              )}
                            </div>
                            <p
                              className="text-sm text-slate-300 truncate"
                              title={exercise.instructions}
                            >
                              {exercise.instructions}
                            </p>
                            <p className="text-xs text-slate-500 font-mono mt-1">
                              {exercise.id}
                            </p>
                          </div>

                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onEditExercise(exercise);
                              }}
                              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                              title="Redigera"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteExercise(exercise);
                              }}
                              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                              title="Ta bort"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                });
              })()}

              {/* Empty state / drop zone */}
              {lessonGroup.exercises.length === 0 && (
                <div className="flex items-center justify-center h-24 border-2 border-dashed border-slate-700 rounded-lg text-slate-500 text-sm">
                  Släpp övningar här
                </div>
              )}

              {/* Final drop indicator */}
              {dragOverLesson === lessonGroup.lesson &&
                dragOverIndex === lessonGroup.exercises.length &&
                lessonGroup.exercises.length > 0 && (
                  <div className="h-1 bg-blue-500 rounded-full animate-pulse" />
                )}
            </div>

            {/* Add exercise to this lesson */}
            <button
              onClick={() => onCreateExercise(lessonGroup.lesson)}
              className="w-full mt-3 py-2 border border-dashed border-slate-700 rounded-lg text-slate-500 hover:text-slate-300 hover:border-slate-600 text-sm transition-colors shrink-0 cursor-pointer"
            >
              + Lägg till övning
            </button>
          </div>
        ))}

        {/* Add new lesson card */}
        <button
          onClick={addNewLesson}
          className="min-h-[200px] border-2 border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center gap-2 text-slate-500 hover:text-slate-400 hover:border-slate-700 transition-colors cursor-pointer"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span>Lägg till ny dag</span>
        </button>
      </div>

      {/* Loading overlay */}
      {isUpdating && (
        <div className="fixed inset-0 bg-slate-950/50 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex items-center gap-3">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent" />
            <span className="text-slate-300">Uppdaterar...</span>
          </div>
        </div>
      )}
    </div>
  );
}
