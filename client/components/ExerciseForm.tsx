"use client";

import { useState, useEffect } from "react";
import { Exercise, Concept } from "shared/exercise.schema";
import { createExercise, updateExercise } from "../actions/exercises";

interface ExerciseFormProps {
  exercise?: Exercise | null;
  defaultLesson?: number;
  onSave: () => void;
  onCancel: () => void;
}

const DIFFICULTY_OPTIONS: Exercise["difficulty"][] = ["lätt", "medel", "svår"];
const CONCEPT_OPTIONS: (Concept | "")[] = [
  "",
  "Variabler",
  "Output",
  "Villkor",
  "Jämförelser",
  "Loopar",
  "Metoder",
];

// Common tags from existing exercises
const COMMON_TAGS = [
  "Output",
  "Variabler",
  "Matematik",
  "Input",
  "Villkor",
  "If-else",
  "Jämförelser",
  "Loopar",
  "For",
  "While",
  "Foreach",
  "Break",
  "Arrays",
  "Lists",
  "Methods",
  "Classes",
  "Fields",
  "Constructor",
  "MethodsClass",
];

export function ExerciseForm({
  exercise,
  defaultLesson,
  onSave,
  onCancel,
}: ExerciseFormProps) {
  const isEditing = !!exercise;

  const [formData, setFormData] = useState({
    id: "",
    lesson: defaultLesson || 1,
    difficulty: "lätt" as Exercise["difficulty"],
    title: "",
    instructions: "",
    starterCode: "",
    expectedOutput: "",
    hint: "",
    hints: [] as string[],
    tag: "",
    concept: "" as Concept | "",
    unlockKey: "",
  });

  const [hintsText, setHintsText] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Initialize form with exercise data
  useEffect(() => {
    if (exercise) {
      setFormData({
        id: exercise.id,
        lesson: exercise.lesson,
        difficulty: exercise.difficulty,
        title: exercise.title || "",
        instructions: exercise.instructions,
        starterCode: exercise.starterCode,
        expectedOutput: exercise.expectedOutput,
        hint: exercise.hint || "",
        hints: exercise.hints || [],
        tag: exercise.tag || "",
        concept: exercise.concept || "",
        unlockKey: exercise.unlockKey || "",
      });
      setHintsText(exercise.hints?.join("\n") || "");
    } else if (defaultLesson) {
      setFormData((prev) => ({ ...prev, lesson: defaultLesson }));
    }
  }, [exercise, defaultLesson]);

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleHintsChange = (text: string) => {
    setHintsText(text);
    // Parse hints from textarea (one per line)
    const hints = text.split("\n").filter((h) => h.trim());
    setFormData((prev) => ({ ...prev, hints }));
  };

  const generateId = () => {
    const diffChar =
      formData.difficulty === "lätt"
        ? "latt"
        : formData.difficulty === "medel"
          ? "medel"
          : "svar";
    const timestamp = Date.now().toString(36);
    return `l${formData.lesson}-${diffChar}-${timestamp}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      // Validation
      if (!formData.instructions.trim()) {
        throw new Error("Instruktioner är obligatoriskt");
      }
      if (!formData.starterCode.trim()) {
        throw new Error("Startkod är obligatoriskt");
      }
      if (!formData.expectedOutput.trim()) {
        throw new Error("Förväntad output är obligatoriskt");
      }

      const exerciseData: Omit<Exercise, "id"> & { id?: string } = {
        lesson: formData.lesson,
        difficulty: formData.difficulty,
        instructions: formData.instructions.trim(),
        starterCode: formData.starterCode,
        expectedOutput: formData.expectedOutput,
        title: formData.title.trim() || undefined,
        hint: formData.hint.trim() || undefined,
        hints: formData.hints.length > 0 ? formData.hints : undefined,
        tag: formData.tag.trim() || undefined,
        concept: formData.concept || undefined,
        unlockKey: formData.unlockKey.trim() || undefined,
      };

      if (isEditing) {
        const result = await updateExercise(exercise.id, exerciseData);
        if (!result.success) {
          throw new Error(result.error || "Kunde inte uppdatera övningen");
        }
      } else {
        const id = formData.id.trim() || generateId();
        const result = await createExercise({ ...exerciseData, id });
        if (!result.success) {
          throw new Error(result.error || "Kunde inte skapa övningen");
        }
      }

      onSave();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ett fel uppstod");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 z-50 overflow-y-auto">
      <div className="min-h-full flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-3xl my-8">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-slate-800">
            <h2 className="text-xl font-bold text-white">
              {isEditing ? "Redigera övning" : "Ny övning"}
            </h2>
            <button
              onClick={onCancel}
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Error message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Row 1: ID, Lesson, Difficulty */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  ID {!isEditing && "(genereras automatiskt)"}
                </label>
                <input
                  type="text"
                  value={formData.id}
                  onChange={(e) => handleChange("id", e.target.value)}
                  disabled={isEditing}
                  placeholder="l1-latt-abc123"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Dag/Lektion *
                </label>
                <input
                  type="number"
                  value={formData.lesson}
                  onChange={(e) =>
                    handleChange("lesson", parseInt(e.target.value) || 1)
                  }
                  min={1}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Svårighetsgrad *
                </label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => handleChange("difficulty", e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {DIFFICULTY_OPTIONS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 2: Title, Tag, Concept */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Titel (valfritt)
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Grundläggande variabler"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Tagg
                </label>
                <input
                  type="text"
                  value={formData.tag}
                  onChange={(e) => handleChange("tag", e.target.value)}
                  list="tag-suggestions"
                  placeholder="Output"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <datalist id="tag-suggestions">
                  {COMMON_TAGS.map((t) => (
                    <option key={t} value={t} />
                  ))}
                </datalist>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Koncept
                </label>
                <select
                  value={formData.concept}
                  onChange={(e) => handleChange("concept", e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {CONCEPT_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c || "(inget)"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Instructions */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Instruktioner *
              </label>
              <textarea
                value={formData.instructions}
                onChange={(e) => handleChange("instructions", e.target.value)}
                rows={3}
                placeholder='Skriv ut texten "Hej" till konsolen.'
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Starter Code */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Startkod *
              </label>
              <textarea
                value={formData.starterCode}
                onChange={(e) => handleChange("starterCode", e.target.value)}
                rows={6}
                placeholder="Console.WriteLine(___);"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ tabSize: 4 }}
              />
            </div>

            {/* Expected Output */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Förväntad output *
              </label>
              <textarea
                value={formData.expectedOutput}
                onChange={(e) => handleChange("expectedOutput", e.target.value)}
                rows={3}
                placeholder="Hej"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Hints */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Ledtråd (enkel)
                </label>
                <input
                  type="text"
                  value={formData.hint}
                  onChange={(e) => handleChange("hint", e.target.value)}
                  placeholder="Glöm inte citattecken"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Progressiva ledtrådar (en per rad)
                </label>
                <textarea
                  value={hintsText}
                  onChange={(e) => handleHintsChange(e.target.value)}
                  rows={3}
                  placeholder="Första ledtråden&#10;Andra ledtråden&#10;Tredje ledtråden"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>

            {/* Unlock Key */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Lås-nyckel (valfritt, låser övningen tills en viss övning är
                klar)
              </label>
              <input
                type="text"
                value={formData.unlockKey}
                onChange={(e) => handleChange("unlockKey", e.target.value)}
                placeholder="l1-latt-1"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={onCancel}
                disabled={saving}
                className="px-6 py-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                Avbryt
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {saving && (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                )}
                {isEditing ? "Spara ändringar" : "Skapa övning"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
