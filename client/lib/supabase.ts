import { createBrowserClient } from "@supabase/ssr";

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      detectSessionInUrl: true,
      flowType: 'pkce',
      // Determine if we need to disable lock to avoid AbortError in dev
      // lock: typeof window !== 'undefined' && window.self !== window.top ? false : true,
    }
  }
);