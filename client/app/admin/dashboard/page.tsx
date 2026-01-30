"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAdminUsers } from "@/actions/admin";

interface AdminUser {
  id: string;
  email?: string;
  last_sign_in_at?: string;
  created_at?: string;
  display_name: string;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchUsers() {
      const data = await getAdminUsers();
      if (!data) {
        // Handle unauthorized or error (redirect to login)
        router.push("/admin");
        return;
      }
      setUsers(data);
      setLoading(false);
    }
    fetchUsers();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400">Laddar användare...</p>
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
          <div className="text-sm text-slate-500">
            {users.length} användare registrerade
          </div>
        </header>

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
                  {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'Aldrig'}
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
  );
}
