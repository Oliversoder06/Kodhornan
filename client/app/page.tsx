"use client";

import { ExerciseBoard } from "../components/ExerciseBoard";
import { ConceptProgress } from "../components/ConceptProgress";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user, signOut } = useAuth();

  return (
    <div className="w-full max-w-[1200px] mx-auto p-8">
      <header className="text-center mb-20 pt-16 relative">
        {/* User info and sign out */}
        {user && (
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ color: "#94a3b8", fontSize: 14 }}>{user.email}</span>
            <button
              onClick={signOut}
              style={{
                padding: "6px 12px",
                backgroundColor: "transparent",
                color: "#94a3b8",
                border: "1px solid #475569",
                borderRadius: 4,
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              Logga ut
            </button>
          </div>
        )}
        <h1 className="text-6xl mb-4 font-extrabold pb-2 bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          Kodhörnan
        </h1>
        <p className="text-slate-400 text-xl max-w-[600px] mx-auto font-normal">
          Lär dig programmera C# steg för steg
        </p>
      </header>
      <div className="flex gap-8">
        <div className="flex-1">
          <ExerciseBoard />
        </div>
        <aside className="w-72 flex-shrink-0">
          <ConceptProgress />
        </aside>
      </div>
    </div>
  );
}
