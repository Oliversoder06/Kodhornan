"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { runCode } from "../../../lib/api";
import { useExerciseContext } from "../../../context/ExerciseContext";
import { ErrorDisplay } from "../../../components/ErrorDisplay";
import { TeacherMode } from "../../../components/TeacherMode";
import { Check, ChevronRight, RotateCcw, Lightbulb, RefreshCcw } from "lucide-react";
import { supabase } from "../../../lib/supabase";
import { saveCode, saveCodeAndOutput, getSavedCode, deleteSavedCode, SavedOutput } from "../../../lib/savedCode";
import { trackAttempt, trackHintUsed, trackTimeSpent } from "../../../lib/teacherAnalytics";
import { translateError } from "../../../lib/errorTranslations";

export default function ExercisePage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { 
    getExercise, 
    markComplete, 
    isCompleted,
    getNextExercise,
    isLastExerciseInLesson,
  } = useExerciseContext();
  
  const exercise = getExercise(params.id as string);
  const exerciseId = params.id as string;

  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [showStarterCode, setShowStarterCode] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  
  // Progressive hints state
  const [visibleHints, setVisibleHints] = useState(0);

  // Autosave debounce ref
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Time tracking refs
  const startTimeRef = useRef<number>(Date.now());
  const lastSavedTimeRef = useRef<number>(0);

  // Teacher mode via query param
  const isTeacherMode = searchParams.get("teacher") === "1";

  const completed = exercise ? isCompleted(exerciseId) : false;

  // Get user ID on mount
  useEffect(() => {
    async function getUser() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
      }
    }
    getUser();
  }, []);

  // Load saved code and output on mount
  useEffect(() => {
    async function loadSavedCode() {
      if (!userId) return;
      const saved = await getSavedCode(userId, exerciseId);
      if (saved) {
        setCode(saved.code);
        // Restore output state from JSON structure
        if (saved.output) {
          if (saved.output.state === 'error' && saved.output.technical_error) {
            // Restore error state
            setError(saved.output.technical_error);
            setOutput("");
          } else if (saved.output.output) {
            // Restore success/normal output
            setOutput(saved.output.output);
            setError("");
            if (saved.output.state === 'success') {
              setIsCorrect(true);
            }
          }
        }
      }
    }
    loadSavedCode();
  }, [userId, exerciseId]);

  // Reset state when navigating to a new exercise
  useEffect(() => {
    setIsCorrect(completed);
    setVisibleHints(0);
    setError("");
    startTimeRef.current = Date.now();
    lastSavedTimeRef.current = 0;

    // Clear output for incomplete exercises (completed ones load from DB in loadSavedCode)
    if (!completed) {
      setOutput("");
    }
  }, [exerciseId, completed]);

  // Track time spent on unmount or exercise change
  useEffect(() => {
    return () => {
      if (userId) {
        const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000) - lastSavedTimeRef.current;
        if (timeSpent > 5) { // Only save if > 5 seconds
          trackTimeSpent(userId, exerciseId, timeSpent);
        }
      }
    };
  }, [userId, exerciseId]);

  // Ref to track latest code for cleanup
  const latestCodeRef = useRef(code);
  useEffect(() => {
    latestCodeRef.current = code;
  }, [code]);

  // Save on unmount to ensure we don't lose unsaved changes
  useEffect(() => {
    return () => {
      if (userId && latestCodeRef.current) {
        // Clear any pending debounced save
        if (saveTimeoutRef.current) {
          clearTimeout(saveTimeoutRef.current);
        }
        // Immediately save the latest code (only code, not output)
        saveCode(userId, exerciseId, latestCodeRef.current);
      }
    };
  }, [userId, exerciseId]);

  // Debounced autosave - ONLY saves code, not output
  const debouncedSave = useCallback((newCode: string) => {
    if (!userId) return;
    
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    saveTimeoutRef.current = setTimeout(() => {
      // Only save code - output is saved on RUN
      saveCode(userId, exerciseId, newCode);
    }, 800); // Save after 800ms of no typing
  }, [userId, exerciseId]);

  // Handle code change with autosave
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    debouncedSave(newCode);
  };

  if (!exercise) {
    return (
      <div className="container">
        <p>Övning hittades inte</p>
        <Link href="/">Tillbaka till startsidan</Link>
      </div>
    );
  }

  // Get all hints (support both single hint and hints array)
  const allHints: string[] = exercise.hints || (exercise.hint ? [exercise.hint] : []);
  const hasMoreHints = visibleHints < allHints.length;

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("");
    setError("");
    setIsCorrect(false);

    const result = await runCode(code);

    setOutput(result.output);
    setError(result.error);
    setIsRunning(false);

    // Determine state and build output JSON
    const isSuccess = !result.error && result.output && exercise && 
                      result.output.trim() === exercise.expectedOutput.trim();
    
    // Translate error for friendly message
    const translated = result.error ? translateError(result.error) : null;
    
    // Build the output JSON structure
    const outputData: SavedOutput = {
      state: isSuccess ? 'success' : result.error ? 'error' : '',
      output: result.output || "",
      technical_error: result.error || null,
      clarified_error: translated?.friendly || null
    };

    // Save code AND output together when user clicks RUN
    if (userId) {
      console.log("Saving to DB:", { code: code.substring(0, 30), output: outputData });
      saveCodeAndOutput(userId, exerciseId, code, outputData).catch(err =>
        console.error("Failed to save output:", err)
      );
    } else {
      console.warn("Not saving - userId is null.");
    }

    // Track attempt
    if (userId) {
      trackAttempt(userId, exerciseId);
    }

    // Check if output matches expected
    if (isSuccess) {
      setIsCorrect(true);
      await markComplete(exerciseId);
      
      // Track final time spent on success
      if (userId) {
        const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
        trackTimeSpent(userId, exerciseId, timeSpent);
        lastSavedTimeRef.current = timeSpent;
      }
    }
  };

  const handleReset = async () => {
    // Save current code before resetting (non-blocking, in case user changes mind)
    if (userId && code) {
      saveCode(userId, exerciseId, code).catch(err => 
        console.error("Failed to save before reset:", err)
      );
    }

    setCode("");
    setOutput("");
    setError("");
    setIsCorrect(false);
    
    // Clear saved code and output from database
    if (userId) {
      setTimeout(() => deleteSavedCode(userId, exerciseId), 100);
    }
  };

  const handleUseStarterCode = () => {
    if (exercise.starterCode) {
      setCode(exercise.starterCode);
      debouncedSave(exercise.starterCode);
    }
  };

  const handleShowNextHint = () => {
    if (hasMoreHints) {
      setVisibleHints((prev) => prev + 1);
      
      // Track hint usage
      if (userId) {
        trackHintUsed(userId, exerciseId);
      }
    }
  };

  const handleNextExercise = () => {
    const next = getNextExercise(exerciseId);
    if (next) {
      router.push(`/exercise/${next.id}`);
    }
  };

  const handleNextLesson = () => {
    const next = getNextExercise(exerciseId);
    if (next) {
      router.push(`/exercise/${next.id}`);
    } else {
      router.push("/");
    }
  };

  const isLastInLesson = isLastExerciseInLesson(exerciseId);
  const nextExercise = getNextExercise(exerciseId);

  return (
    <div className="grid grid-cols-[400px_1fr] h-screen overflow-hidden bg-slate-950">
      <aside className="bg-slate-900 border-r border-slate-700 overflow-y-auto flex flex-col p-6 gap-8">
        <div className="mb-2">
          <button
            onClick={async () => {
              // Save before navigating away (AWAIT to prevent race condition)
              if (userId && code) {
                await saveCode(userId, exerciseId, code).catch(err => 
                  console.error("Failed to save before navigation:", err)
                );
              }
              router.push("/");
            }}
            className="inline-flex items-center text-slate-400 hover:text-slate-100 no-underline font-medium text-sm transition-all hover:-translate-x-1 bg-transparent border-none cursor-pointer"
          >
            ← Tillbaka
          </button>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl text-slate-100 font-bold tracking-tight">Instruktioner</h2>
          <p className="text-slate-400 leading-relaxed text-[0.95rem]">{exercise.instructions}</p>
        </div>

        {/* Progressive Hints System */}
        {allHints.length > 0 && (
          <div className="space-y-3">
            {visibleHints > 0 && (
              <div className="space-y-2">
                {allHints.slice(0, visibleHints).map((hint, index) => (
                  <div
                    key={index}
                    className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-sm text-yellow-400 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    <div className="flex items-center gap-2 mb-2 text-xs text-yellow-500/70 uppercase tracking-wider font-semibold">
                      <Lightbulb size={12} />
                      Tips {index + 1}
                    </div>
                    {hint}
                  </div>
                ))}
              </div>
            )}
            
            {hasMoreHints && (
              <button
                onClick={handleShowNextHint}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-left text-slate-100 hover:bg-slate-700 transition-colors flex justify-between items-center group"
              >
                <span className="flex items-center gap-2">
                  <Lightbulb size={16} className="text-yellow-500" />
                  Visa tips {visibleHints + 1} av {allHints.length}
                </span>
                <span className="text-slate-500 group-hover:text-slate-300 transition-colors">
                  +
                </span>
              </button>
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
            onChange={(e) => handleCodeChange(e.target.value)}
            className="flex-1 w-full font-mono text-base bg-transparent text-slate-200 resize-none outline-none p-6 leading-relaxed selection:bg-emerald-500/30"
            spellCheck={false}
            placeholder="// Skriv din kod här..."
          />
          
          <div className="absolute top-6 right-8 flex items-center gap-3 z-10">
            {code.trim().length > 0 && (
              <button
                onClick={handleReset}
                disabled={isRunning}
                className="bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700 px-4 py-2 rounded-lg text-xs font-bold transition-all border border-slate-700 uppercase tracking-wide animate-in fade-in zoom-in-95 duration-200 flex items-center gap-2"
              >
                <RotateCcw size={14} />
                Återställ
              </button>
            )}
            
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="bg-emerald-600 text-white px-5 py-2 rounded-lg text-sm font-bold shadow-lg shadow-emerald-900/20 hover:bg-emerald-500 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-wait uppercase tracking-wide flex items-center gap-2 cursor-pointer"
            >
              {isRunning ? (
                <>
                  <span className="animate-spin"><RefreshCcw size={16} /></span> Kör...
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
                  <div className="mt-4 space-y-4">
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
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

                    {nextExercise && (
                      <button
                        onClick={isLastInLesson ? handleNextLesson : handleNextExercise}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 shadow-lg shadow-emerald-900/30 animate-in fade-in slide-in-from-bottom-3 duration-300 delay-150"
                      >
                        {isLastInLesson ? "Nästa lektion" : "Nästa uppgift"}
                        <ChevronRight size={20} />
                      </button>
                    )}
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

      {/* Teacher Mode Panel */}
      {isTeacherMode && <TeacherMode exerciseId={exerciseId} />}
    </div>
  );
}
