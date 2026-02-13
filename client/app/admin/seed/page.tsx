"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { coreExercises } from "@/lib/exercises";
import { bulkImportExercises, getAllExercises } from "@/actions/exercises";

export default function AdminSeedPage() {
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [dbCount, setDbCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkExistingExercises() {
      const exercises = await getAllExercises();
      setDbCount(exercises.length);
      setLoading(false);
    }
    checkExistingExercises();
  }, []);

  const handleImport = async () => {
    if (
      !confirm(
        dbCount > 0
          ? `Det finns redan ${dbCount} övningar i databasen. Vill du importera dessa ${coreExercises.length} övningar? Befintliga övningar med samma ID kommer att uppdateras.`
          : `Vill du importera ${coreExercises.length} övningar till databasen?`,
      )
    ) {
      return;
    }

    setImporting(true);
    setResult(null);

    try {
      const response = await bulkImportExercises(coreExercises);

      if (response.success) {
        setResult({
          success: true,
          message: `Importerade ${response.imported} övningar till databasen!`,
        });
        // Refresh count
        const exercises = await getAllExercises();
        setDbCount(exercises.length);
      } else {
        setResult({
          success: false,
          message: response.error || "Ett fel uppstod vid import",
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message:
          error instanceof Error ? error.message : "Ett oväntat fel uppstod",
      });
    } finally {
      setImporting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400">Laddar...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-10 border-b border-slate-800 pb-6">
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
              Importera övningar
            </h1>
          </div>
        </header>

        {/* Status */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4">Status</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-white">{dbCount}</div>
              <div className="text-sm text-slate-400">Övningar i databasen</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-white">
                {coreExercises.length}
              </div>
              <div className="text-sm text-slate-400">Övningar i koden</div>
            </div>
          </div>
        </div>

        {/* Import Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4">
            Importera från kod
          </h2>
          <p className="text-slate-400 mb-4">
            Detta kommer att importera alla {coreExercises.length} övningar från
            den nuvarande kodfil-baserade strukturen till databasen. Om en
            övning med samma ID redan finns kommer den att uppdateras.
          </p>

          {result && (
            <div
              className={`mb-4 p-4 rounded-lg ${
                result.success
                  ? "bg-green-500/10 border border-green-500/30 text-green-400"
                  : "bg-red-500/10 border border-red-500/30 text-red-400"
              }`}
            >
              {result.message}
            </div>
          )}

          <button
            onClick={handleImport}
            disabled={importing}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            {importing && (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
            )}
            {importing ? "Importerar..." : "Importera övningar"}
          </button>
        </div>

        {/* Preview */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">
            Förhandsvisning ({coreExercises.length} övningar)
          </h2>
          <div className="max-h-96 overflow-y-auto space-y-2">
            {coreExercises.slice(0, 20).map((ex) => (
              <div key={ex.id} className="bg-slate-800 rounded-lg p-3 text-sm">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-slate-300">{ex.id}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${
                      ex.difficulty === "lätt"
                        ? "bg-green-500/20 text-green-400"
                        : ex.difficulty === "medel"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {ex.difficulty}
                  </span>
                </div>
                <div className="text-slate-500 mt-1 truncate">
                  {ex.instructions}
                </div>
              </div>
            ))}
            {coreExercises.length > 20 && (
              <div className="text-center text-slate-500 py-2">
                ... och {coreExercises.length - 20} till
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-4">
          <Link
            href="/admin/exercises"
            className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors text-center"
          >
            Gå till övningshanteraren
          </Link>
          <Link
            href="/admin/dashboard"
            className="flex-1 py-3 border border-slate-700 hover:border-slate-600 text-slate-300 rounded-lg font-medium transition-colors text-center"
          >
            Tillbaka till dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
