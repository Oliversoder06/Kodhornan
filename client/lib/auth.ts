import { supabase } from "./supabase";

export function signUp(email: string, password: string, displayName: string) {
  return supabase.auth.signUp({ 
    email, 
    password,
    options: {
      data: {
        display_name: displayName
      }
    }
  });
}

export function signIn(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

export function signOut() {
  return supabase.auth.signOut();
}
