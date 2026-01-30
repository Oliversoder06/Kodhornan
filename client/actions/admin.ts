"use server";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

// This should ideally be in env, but per request "just put in a pin"
const ADMIN_PIN = process.env.ADMIN_PIN || "1234";

export async function verifyAdminPin(pin: string) {
  if (pin === ADMIN_PIN) {
    const cookieStore = await cookies();
    cookieStore.set("admin_access", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });
    return true;
  }
  return false;
}

export async function getAdminUsers() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_access")?.value === "true";

  if (!isAdmin) {
    return [];
  }

  // Create admin client with service role key
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    console.error("SUPABASE_SERVICE_ROLE_KEY is missing!");
    return [];
  }

  const supabaseAdmin = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceRoleKey,
    {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {},
      },
    }
  );

  const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers();
  
  if (error) {
    console.error("Error fetching users:", error);
    return [];
  }

  return users.map(u => ({
    id: u.id,
    email: u.email,
    last_sign_in_at: u.last_sign_in_at,
    created_at: u.created_at,
    display_name: u.user_metadata?.display_name || "Namnlös"
  }));
}

export async function getAdminUser(userId: string) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_access")?.value === "true";

  if (!isAdmin) return null;

  const supabaseAdmin = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() { return []; },
        setAll() {},
      },
    }
  );

  const { data: { user }, error } = await supabaseAdmin.auth.admin.getUserById(userId);
  
  if (error || !user) return null;

  return {
    id: user.id,
    email: user.email,
    display_name: user.user_metadata?.display_name || "Namnlös",
    created_at: user.created_at
  };
}
