import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Server-side Supabase client using the Service Role Key.
 * Bypasses RLS — only use in trusted server contexts (API routes).
 */
export function createServerSupabase() {
  let url = supabaseUrl?.trim();
  let key = serviceRoleKey?.trim();
  
  if (!url || !key) {
    return createClient('https://placeholder.supabase.co', 'placeholder-key', { auth: { persistSession: false } });
  }
  
  try {
    return createClient(url, key, { auth: { persistSession: false } });
  } catch(e) {
    return createClient('https://placeholder.supabase.co', 'placeholder-key', { auth: { persistSession: false } });
  }
}

/**
 * Verifies a Supabase JWT from an Authorization header.
 * Returns the user object if valid, null otherwise.
 */
export async function verifyAdmin(authHeader: string | null) {
  if (!authHeader?.startsWith('Bearer ')) return null;
  const token = authHeader.slice(7);

  let url = supabaseUrl?.trim();
  let key = anonKey?.trim();
  
  if (!url || !key) {
    return null;
  }

  let supabase;
  try {
    supabase = createClient(url, key, { auth: { persistSession: false } });
  } catch(e) {
    return null;
  }

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return null;
  return user;
}
