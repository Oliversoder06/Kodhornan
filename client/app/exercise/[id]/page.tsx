"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getExerciseById } from "../../../lib/exercises";
import { runCode } from "../../../lib/api";
import { useExerciseContext } from "../../../context/ExerciseContext";
import { Check } from "lucide-react";

export default function ExercisePage() {
  const params = useParams();
  const { getExercise, markComplete, isCompleted } = useExerciseContext();
  // Try to find in context (includes generated)
  const exercise = getExercise(params.id as string);

  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showStarterCode, setShowStarterCode] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const exerciseId = params.id as string;
  const completed = exercise ? isCompleted(exerciseId) : false;

  // Reset isCorrect when navigating to a new exercise
  useEffect(() => {
    setIsCorrect(completed);
  }, [exerciseId, completed]);

  if (!exercise) {
    return (
      <div className="container">
        <p>Övning hittades inte</p>
        <Link href="/">Tillbaka till startsidan</Link>
      </div>
    );
  }

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("");
    setError("");
    setIsCorrect(false);

    const result = await runCode(code);

    setOutput(result.output);
    setError(result.error);
    setIsRunning(false);

    // Check if output matches expected
    if (
      exercise &&
      result.output.trim() === exercise.expectedOutput.trim() &&
      !result.error
    ) {
      setIsCorrect(true);
      // Mark exercise as complete in database
      await markComplete(exerciseId);
    }
  };

  const handleUseStarterCode = () => {
    if (exercise.starterCode) {
      setCode(exercise.starterCode);
    }
  };

  return (
    <div className="grid grid-cols-[400px_1fr] h-screen overflow-hidden bg-slate-950">
      <aside className="bg-slate-900 border-r border-slate-700 overflow-y-auto flex flex-col p-6 gap-8">
        <div className="mb-2">
          <Link 
            href="/" 
            className="inline-flex items-center text-slate-400 hover:text-slate-100 no-underline font-medium text-sm transition-all hover:-translate-x-1"
          >
            ← Tillbaka
          </Link>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl text-slate-100 font-bold tracking-tight">Instruktioner</h2>
          <p className="text-slate-400 leading-relaxed text-[0.95rem]">{exercise.instructions}</p>
        </div>

        {exercise.hint && (
          <div className="space-y-3">
            <button
              onClick={() => setShowHint(!showHint)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-left text-slate-100 hover:bg-slate-700 transition-colors flex justify-between items-center group"
            >
              <span>{showHint ? "Dölj tips" : "Visa tips"}</span>
              <span className="text-slate-500 group-hover:text-slate-300 transition-colors">
                {showHint ? "−" : "+"}
              </span>
            </button>
            {showHint && (
              <p className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-sm text-yellow-400 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200">
                {exercise.hint}
              </p>
            )}
          </div>
        )}

        {exercise.starterCode && (
          <div className="space-y-3">
            <button
              onClick={() => setShowStarterCode(!showStarterCode)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-left text-slate-100 hover:bg-slate-700 transition-colors flex justify-between items-center group"
            >
              <span>{showStarterCode ? "Dölj startkod" : "Visa startkod"}</span>
              <span className="text-slate-500 group-hover:text-slate-300 transition-colors">
                {showStarterCode ? "−" : "+"}
              </span>
            </button>
            {showStarterCode && (
              <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                <pre className="p-4 bg-black/50 border border-slate-700/50 rounded-lg text-sm text-yellow-500/90 font-mono overflow-x-auto">
                  {exercise.starterCode}
                </pre>
                <button
                  onClick={handleUseStarterCode}
                  className="w-full py-2 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-md border border-slate-700 transition-colors"
                >
                  Använd startkod
                </button>
              </div>
            )}
          </div>
        )}

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
        <div className="flex-1 flex flex-col bg-[#0B1120] relative">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 w-full font-mono text-base bg-transparent text-slate-200 resize-none outline-none p-6 leading-relaxed selection:bg-emerald-500/30"
            spellCheck={false}
            placeholder="// Skriv din kod här..."
          />
          
          <div className="absolute top-6 right-8 flex items-center gap-3 z-10">
            {code.trim().length > 0 && (
              <button
                onClick={() => setCode("")}
                disabled={isRunning}
                className="bg-red-500/10 text-red-500 hover:text-red-400 hover:bg-red-500/20 px-4 py-2 rounded-lg text-xs font-bold transition-all border border-red-500/50 uppercase tracking-wide animate-in fade-in zoom-in-95 duration-200"
              >
                Rensa
              </button>
            )}
            
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="bg-emerald-600 text-white px-5 py-2 rounded-lg text-sm font-bold shadow-lg shadow-emerald-900/20 hover:bg-emerald-500 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-wait uppercase tracking-wide flex items-center gap-2"
            >
              {isRunning ? (
                <>
                  <span className="animate-spin">⟳</span> Kör...
                </>
              ) : (
                "Kör ▶"
              )}
            </button>
          </div>
        </div>

        <div className="h-[35vh] min-h-[200px] border-t border-slate-800 bg-slate-950 flex flex-col shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3)] z-10">
          <div className="px-6 py-2 bg-slate-900 border-b border-slate-800 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-500 opacity-50"></span>
            <h3 className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
              Output
            </h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-0 relative">
            {error && (
              <pre className="p-6 font-mono text-sm text-red-400 bg-red-500/5 border-l-2 border-red-500 h-full">
                {error}
              </pre>
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
                  <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/20">
                      <Check size={18} color="white" strokeWidth={3} />
                    </div>
                    <div>
                      <p className="text-emerald-500 font-semibold text-lg leading-none mb-1">
                        Rätt svar! ✓
                      </p>
                      <p className="text-emerald-300/80 text-sm">
                        Bra jobbat! Övningen är markerad som klar.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {!error && !output && (
              <div className="h-full flex items-center justify-center text-slate-600 italic">
                <p>Kör koden för att se resultat...</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
