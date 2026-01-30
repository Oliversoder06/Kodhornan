"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { getAnalytics } from "../lib/teacherAnalytics";
import { Clock, Lightbulb, Play } from "lucide-react";

interface Analytics {
  exercise_id: string;
  attempt_count: number;
  time_spent_seconds: number;
  hints_used: number;
  last_attempt_at: string;
}

interface TeacherModeProps {
  exerciseId: string;
}

/**
 * Teacher Mode Panel - Shows debug/insight data.
 * Hidden behind ?teacher=1 query param.
 * Read-only, no graphs - just raw data.
 */
export function TeacherMode({ exerciseId }: TeacherModeProps) {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [allAnalytics, setAllAnalytics] = useState<Analytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const data = await getAnalytics(session.user.id);
        setAllAnalytics(data);
        setAnalytics(data.find(a => a.exercise_id === exerciseId) || null);
      }
      setLoading(false);
    }
    fetchData();
  }, [exerciseId]);

  const formatTime = (seconds: number): string => {
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  if (loading) {
    return (
      <div className="fixed bottom-4 right-4 bg-slate-900 border border-slate-700 rounded-lg p-4 shadow-xl z-50 w-80">
        <p className="text-slate-400 text-sm">Laddar lärarvy...</p>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-slate-900 border border-yellow-500/30 rounded-lg p-4 shadow-xl z-50 w-80 max-h-96 overflow-y-auto">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-700">
        <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
        <h3 className="text-xs uppercase tracking-wider font-bold text-yellow-500">
          Lärarläge
        </h3>
      </div>

      {analytics ? (
        <div className="space-y-3">
          <h4 className="text-xs text-slate-400 font-medium">
            Denna övning: {exerciseId}
          </h4>
          
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-slate-800 rounded p-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                <Play size={12} />
                Försök
              </div>
              <p className="text-lg font-bold text-slate-200">
                {analytics.attempt_count}
              </p>
            </div>

            <div className="bg-slate-800 rounded p-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                <Clock size={12} />
                Tid
              </div>
              <p className="text-lg font-bold text-slate-200">
                {formatTime(analytics.time_spent_seconds)}
              </p>
            </div>

            <div className="bg-slate-800 rounded p-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                <Lightbulb size={12} />
                Tips
              </div>
              <p className="text-lg font-bold text-slate-200">
                {analytics.hints_used}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-slate-500 text-sm">Ingen data för denna övning än.</p>
      )}

      {/* Toggle to show all exercises */}
      <button
        onClick={() => setShowAll(!showAll)}
        className="w-full mt-4 text-xs text-slate-500 hover:text-slate-300 transition-colors"
      >
        {showAll ? "Dölj alla övningar" : `Visa alla (${allAnalytics.length})`}
      </button>

      {showAll && allAnalytics.length > 0 && (
        <div className="mt-3 space-y-2 border-t border-slate-700 pt-3">
          {allAnalytics.map((a) => (
            <div key={a.exercise_id} className="bg-slate-800 rounded p-2 text-xs">
              <p className="text-slate-300 font-medium truncate">{a.exercise_id}</p>
              <div className="flex gap-3 mt-1 text-slate-500">
                <span>{a.attempt_count} försök</span>
                <span>{formatTime(a.time_spent_seconds)}</span>
                <span>{a.hints_used} tips</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
