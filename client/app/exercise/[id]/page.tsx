"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getExerciseById } from "../../../lib/exercises";
import { runCode } from "../../../lib/api";

export default function ExercisePage() {
  const params = useParams();
  const exercise = getExerciseById(params.id as string);

  const [code, setCode] = useState(exercise?.starterCode || "");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

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

    const result = await runCode(code);
    
    setOutput(result.output);
    setError(result.error);
    setIsRunning(false);
  };

  return (
    <div className="exercise-layout">
      <aside className="sidebar">
        <Link href="/" className="back-link">← Tillbaka</Link>
        
        <div className="instructions-section">
          <h2>Instruktioner</h2>
          <p>{exercise.instructions}</p>
        </div>

        {exercise.hint && (
          <div className="hint-section">
            <button onClick={() => setShowHint(!showHint)} className="hint-button">
              {showHint ? "Dölj tips" : "Visa tips"}
            </button>
            {showHint && <p className="hint-text">{exercise.hint}</p>}
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
          />
          <button onClick={handleRun} disabled={isRunning} className="run-button">
            {isRunning ? "Kör..." : "Kör ▶"}
          </button>
        </div>

        <div className="output-section">
          <h3>Output</h3>
          {error && <pre className="error-output">{error}</pre>}
          {output && <pre className="program-output">{output}</pre>}
          {!error && !output && <p className="no-output">Inget resultat ännu</p>}
        </div>
      </main>
    </div>
  );
}
