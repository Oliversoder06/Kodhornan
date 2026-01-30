"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useExerciseContext } from "../context/ExerciseContext";
import { ErrorDisplay } from "./ErrorDisplay";
import { Lightbulb, RotateCcw, RefreshCcw, Check, ChevronRight } from "lucide-react";
import { getSavedCode } from "../lib/savedCode";

interface ReadOnlyExerciseViewProps {
  exerciseId: string;
  userId: string;
}

export function ReadOnlyExerciseView({ exerciseId, userId }: ReadOnlyExerciseViewProps) {
  const router = useRouter();
  const { 
    getExercise, 
    getNextExercise,
    isLastExerciseInLesson,
    basePath
  } = useExerciseContext();
  
  const exercise = getExercise(exerciseId);

  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load saved code
  useEffect(() => {
    async function loadSavedCode() {
      if (!userId) return;
      const saved = await getSavedCode(userId, exerciseId);
      if (saved) {
        setCode(saved.code);
        // Restore output state from JSON structure
        if (saved.output) {
          if (saved.output.state === 'error' && saved.output.technical_error) {
            setError(saved.output.technical_error);
            setOutput("");
          } else if (saved.output.output) {
            setOutput(saved.output.output);
            setError("");
            if (saved.output.state === 'success') {
              setIsCorrect(true);
            }
          }
        }
      }
      setLoading(false);
    }
    loadSavedCode();
  }, [userId, exerciseId]);

  if (!exercise) {
    return (
      <div className="p-8 text-center text-slate-400">
        <p>Övning hittades inte</p>
      </div>
    );
  }

  // Navigation helpers using context basePath
  const handleNextExercise = () => {
    const next = getNextExercise(exerciseId);
    if (next) {
      router.push(`${basePath}/${next.id}`);
    }
  };

  const handleNextLesson = () => {
    const next = getNextExercise(exerciseId);
    if (next) {
      router.push(`${basePath}/${next.id}`);
    } else {
      router.push(basePath.split("/exercise")[0]); // Go back to user dashboard
    }
  };

  const isLastInLesson = isLastExerciseInLesson(exerciseId);
  const nextExercise = getNextExercise(exerciseId);

  if (loading) {
    return <div className="p-8 text-slate-400">Laddar kod...</div>;
  }

  return (
    <div className="grid grid-cols-[400px_1fr] h-screen overflow-hidden bg-slate-950">
      <aside className="bg-slate-900 border-r border-slate-700 overflow-y-auto flex flex-col p-6 gap-8">
        <div className="mb-2">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-slate-400 hover:text-slate-100 no-underline font-medium text-sm transition-all hover:-translate-x-1 bg-transparent border-none cursor-pointer"
          >
            ← Tillbaka
          </button>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl text-slate-100 font-bold tracking-tight">Instruktioner</h2>
          <p className="text-slate-400 leading-relaxed text-[0.95rem]">{exercise.instructions}</p>
        </div>

        <div className="mt-auto pt-6 border-t border-slate-800">
          <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-3">
            Förväntat resultat
          </h3>
          <pre className="bg-black rounded-lg border border-slate-800 p-4 font-mono text-sm text-slate-400 leading-relaxed overflow-x-auto shadow-inner">
            {exercise.expectedOutput}
          </pre>
        </div>
      </aside>

      <main className="flex flex-col overflow-hidden bg-black relative">
        <div className="flex-1 flex flex-col bg-[#0B1120] relative overflow-auto">
          {/* Read-Only Code Display */}
          <div className="p-6 font-mono text-base text-slate-200 leading-relaxed whitespace-pre-wrap">
            {code || <span className="text-slate-600 italic">// Ingen kod sparad än...</span>}
          </div>
          
          <div className="absolute top-6 right-8 flex items-center gap-3 z-10">
             <span className="bg-slate-800 text-slate-400 px-3 py-1 rounded text-xs uppercase font-bold border border-slate-700">
               Read Only
             </span>
          </div>
        </div>

        <div className="h-[35vh] min-h-[200px] border-t border-slate-800 bg-slate-950 flex flex-col shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3)] z-10">
          <div className="px-6 py-2 bg-slate-900 border-b border-slate-800 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-500 opacity-50"></span>
            <h3 className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
              Output (Sparat)
            </h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-0 relative">
            {error && (
              <ErrorDisplay error={error} />
            )}
            
            {output && (
              <div className="p-6 h-full font-mono text-sm">
                <pre
                  className={`text-slate-100 whitespace-pre-wrap ${
                    isCorrect
                      ? "p-4 bg-green-500/10 border border-green-500 rounded-lg shadow-[0_0_15px_rgba(34,197,94,0.1)]"
                      : ""
                  }`}
                >
                  {output}
                </pre>
                
                {isCorrect && (
                   <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500 rounded-lg flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/20">
                        <Check size={18} color="white" strokeWidth={3} />
                      </div>
                      <div>
                        <p className="text-emerald-500 font-semibold text-lg leading-none mb-1">
                          Rätt svar! ✓
                        </p>
                      </div>
                    </div>
                )}
              </div>
            )}

            {!error && !output && (
              <div className="h-full flex items-center justify-center text-slate-600 italic">
                <p>Ingen output sparad...</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
