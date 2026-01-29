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
    <div className="exercise-layout">
      <aside className="sidebar">
        <Link href="/" className="back-link">
          ← Tillbaka
        </Link>

        <div className="instructions-section">
          <h2>Instruktioner</h2>
          <p>{exercise.instructions}</p>
        </div>

        {exercise.hint && (
          <div className="hint-section">
            <button
              onClick={() => setShowHint(!showHint)}
              className="hint-button"
            >
              {showHint ? "Dölj tips" : "Visa tips"}
            </button>
            {showHint && <p className="hint-text">{exercise.hint}</p>}
          </div>
        )}

        {exercise.starterCode && (
          <div className="starter-code-section">
            <button
              onClick={() => setShowStarterCode(!showStarterCode)}
              className="hint-button"
            >
              {showStarterCode ? "Dölj startkod" : "Visa startkod"}
            </button>
            {showStarterCode && (
              <div className="starter-code-container">
                <pre className="hint-text">{exercise.starterCode}</pre>
                <button
                  onClick={handleUseStarterCode}
                  className="use-starter-code-button"
                >
                  Använd startkod
                </button>
              </div>
            )}
          </div>
        )}

        <div className="expected-section">
          <h3>Förväntat resultat</h3>
          <pre className="expected-output">{exercise.expectedOutput}</pre>
        </div>
      </aside>

      <main className="main-area">
        <div className="editor-section">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="code-editor"
            spellCheck={false}
            placeholder="// Skriv din kod här..."
          />
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="run-button"
          >
            {isRunning ? "Kör..." : "Kör ▶"}
          </button>
        </div>

        <div className="output-section">
          <h3>Output</h3>
          {error && <pre className="error-output">{error}</pre>}
          {output && (
            <pre
              className="program-output"
              style={
                isCorrect
                  ? {
                      border: "2px solid #22c55e",
                      backgroundColor: "rgba(34, 197, 94, 0.1)",
                      borderRadius: 8,
                      padding: 16,
                    }
                  : undefined
              }
            >
              {output}
            </pre>
          )}
          {!error && !output && (
            <p className="no-output">Inget resultat ännu</p>
          )}

          {/* Success message */}
          {isCorrect && (
            <div
              style={{
                marginTop: 16,
                padding: 16,
                backgroundColor: "rgba(34, 197, 94, 0.15)",
                border: "2px solid #22c55e",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  backgroundColor: "#22c55e",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Check size={20} color="white" strokeWidth={3} />
              </div>
              <div>
                <p
                  style={{
                    color: "#22c55e",
                    fontWeight: 600,
                    fontSize: 18,
                    margin: 0,
                  }}
                >
                  Rätt svar! ✓
                </p>
                <p
                  style={{
                    color: "#86efac",
                    fontSize: 14,
                    margin: "4px 0 0 0",
                  }}
                >
                  Bra jobbat! Övningen är markerad som klar.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
