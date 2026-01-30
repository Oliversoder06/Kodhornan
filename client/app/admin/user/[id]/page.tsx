"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAdminUser } from "@/actions/admin";
import { ExerciseProvider } from "@/context/ExerciseContext";
import { ExerciseBoard } from "@/components/ExerciseBoard";
import { ConceptProgress } from "@/components/ConceptProgress";

export default function AdminUserPage() {
  const params = useParams();
  const userId = params.id as string;
  const [user, setUser] = useState<{ id: string; email?: string; display_name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const userData = await getAdminUser(userId);
      if (!userData) {
        router.push("/admin/dashboard");
        return;
      }
      setUser(userData);
      setLoading(false);
    }
    fetchUser();
  }, [userId, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400">Laddar användare...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-[1200px] mx-auto">
        <Link 
          href="/admin/dashboard" 
          className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Tillbaka till listan
        </Link>

        <header className="mb-12 border-b border-slate-800 pb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full pointer-events-none"></div>
          
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
              Studentprofil
            </span>
            <h1 className="text-4xl font-extrabold text-white mb-2">
              {user.display_name}
            </h1>
            <p className="text-slate-400 font-mono">
              {user.email} <span className="mx-2 opacity-30">|</span> ID: {user.id}
            </p>
          </div>
        </header>

        <ExerciseProvider 
          forcedUserId={userId} 
          readOnly={true} 
          basePath={`/admin/user/${userId}/exercise`}
        >
          <div className="flex gap-8 items-start flex-col lg:flex-row">
            <div className="flex-1 w-full">
              <ExerciseBoard />
            </div>
            
            <aside className="w-full lg:w-80 flex-shrink-0 sticky top-8">
              <ConceptProgress />
            </aside>
          </div>
        </ExerciseProvider>
      </div>
    </div>
  );
}
