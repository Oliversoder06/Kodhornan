"use client";

import { useState } from "react";
import { translateError } from "../lib/errorTranslations";
import { ChevronDown, ChevronUp, XCircle } from "lucide-react";

interface ErrorDisplayProps {
  error: string;
}

/**
 * Displays compiler errors in a kid-friendly way.
 * Shows a simple Swedish explanation by default.
 * Technical error can be revealed with a toggle.
 */
export function ErrorDisplay({ error }: ErrorDisplayProps) {
  const [showTechnical, setShowTechnical] = useState(false);

  if (!error || error.trim() === "") {
    return null;
  }

  const translated = translateError(error);

  return (
    <div className="p-6 font-mono text-sm bg-red-500/5 border-l-2 border-red-500 h-full">
      {/* Friendly error message */}
      <div className="flex items-start gap-3 mb-4">
        <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-red-300 text-base leading-relaxed">
            {translated.friendly}
          </p>
          {translated.code && (
            <span className="text-red-500/50 text-xs mt-1 inline-block">
              Felkod: {translated.code}
            </span>
          )}
        </div>
      </div>

      {/* Toggle for technical error */}
      <button
        onClick={() => setShowTechnical(!showTechnical)}
        className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-400 transition-colors mt-2"
      >
        {showTechnical ? (
          <>
            <ChevronUp className="w-3 h-3" />
            Dölj tekniskt fel
          </>
        ) : (
          <>
            <ChevronDown className="w-3 h-3" />
            Visa tekniskt fel
          </>
        )}
      </button>

      {/* Technical error (collapsed by default) */}
      {showTechnical && (
        <pre className="mt-3 p-3 bg-black/30 rounded text-red-400/70 text-xs overflow-x-auto whitespace-pre-wrap animate-in fade-in slide-in-from-top-1 duration-200">
          {translated.technical}
        </pre>
      )}
    </div>
  );
}
