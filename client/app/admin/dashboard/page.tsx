"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAdminUsers } from "@/actions/admin";
import { getAllExercises, getAllLessons } from "@/actions/exercises";

interface AdminUser {
  id: string;
  email?: string;
  last_sign_in_at?: string;
  created_at?: string;
  display_name: string;
}

interface Stats {
  totalExercises: number;
  totalLessons: number;
  totalUsers: number;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalExercises: 0,
    totalLessons: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const [usersData, exercises, lessons] = await Promise.all([
        getAdminUsers(),
        getAllExercises(),
        getAllLessons(),
      ]);

      if (!usersData) {
        router.push("/admin");
        return;
      }

      setUsers(usersData);
      setStats({
        totalExercises: exercises.length,
        totalLessons: lessons.length,
        totalUsers: usersData.length,
      });
      setLoading(false);
    }
    fetchData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400">Laddar dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-10 border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <div className="text-sm text-slate-500">Kodhörnan Administration</div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="text-3xl font-bold text-white mb-1">
              {stats.totalUsers}
            </div>
            <div className="text-sm text-slate-400">Användare</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="text-3xl font-bold text-white mb-1">
              {stats.totalExercises}
            </div>
            <div className="text-sm text-slate-400">Övningar</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="text-3xl font-bold text-white mb-1">
              {stats.totalLessons}
            </div>
            <div className="text-sm text-slate-400">Dagar/Lektioner</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-white mb-4">Snabbåtgärder</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/admin/exercises"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl p-6 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">
                    Hantera övningar
                  </h3>
                  <p className="text-sm text-white/70">
                    Skapa, redigera och ordna om övningar
                  </p>
                </div>
              </div>
              <div className="flex items-center text-sm text-white/60 mt-4 group-hover:text-white transition-colors">
                Öppna övningshanteraren →
              </div>
            </Link>

            <Link
              href="/admin/seed"
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-6 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 group-hover:bg-slate-700 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">
                    Importera övningar
                  </h3>
                  <p className="text-sm text-slate-400">
                    Lägg till övningar från fil
                  </p>
                </div>
              </div>
              <div className="flex items-center text-sm text-slate-500 mt-4 group-hover:text-slate-300 transition-colors">
                Importverktyg →
              </div>
            </Link>
          </div>
        </div>

        {/* Users List */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4">
            Användare ({users.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <Link
                key={user.id}
                href={`/admin/user/${user.id}`}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-blue-500/50 hover:bg-slate-800 transition-all group"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="w-12 h-12 rounded-full bg-slate-800 group-hover:bg-slate-700 flex items-center justify-center text-xl font-bold text-slate-400 group-hover:text-white transition-colors">
                    {user.display_name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-mono text-slate-600 bg-slate-950 px-2 py-1 rounded">
                    {user.last_sign_in_at
                      ? new Date(user.last_sign_in_at).toLocaleDateString()
                      : "Aldrig"}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-white mb-1 truncate">
                  {user.display_name}
                </h3>
                <p className="text-sm text-slate-500 truncate mb-4">
                  {user.email}
                </p>

                <div className="flex items-center text-xs text-blue-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Visa framsteg →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
