"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";
import { signOut } from "../lib/auth";

type User = { id: string; email?: string };
type Session = { user: User };

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PUBLIC_PATHS = ["/login", "/signup"];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data }) => {
      const s = data.session;
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: string, s: Session | null) => {
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Redirect logic
  useEffect(() => {
    if (loading) return;

    const isPublicPath = PUBLIC_PATHS.includes(pathname);

    if (!session && !isPublicPath) {
      router.push("/login");
    } else if (session && isPublicPath) {
      router.push("/");
    }
  }, [session, loading, pathname, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  // Show nothing while loading (prevents flash)
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p>Laddar...</p>
      </div>
    );
  }

  // If not logged in and not on public path, show nothing (will redirect)
  const isPublicPath = PUBLIC_PATHS.includes(pathname);
  if (!session && !isPublicPath) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{ user, session, loading, signOut: handleSignOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
