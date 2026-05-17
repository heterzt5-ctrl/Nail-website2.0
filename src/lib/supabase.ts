import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Guard: do not throw at build time when env vars are absent.
// createClient requires a valid URL — passing '' causes an immediate error.
let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
    let url = supabaseUrl?.trim();
    let key = supabaseAnonKey?.trim();

    if (!url || !key) {
        console.warn(
            '[supabase] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing. ' +
            'Supabase calls will fail until env vars are configured on Vercel.'
        );
        // Return a minimal stub so imports don't crash at module evaluation
        return createClient('https://placeholder.supabase.co', 'placeholder-key');
    }
    if (!_client) {
        try {
            _client = createClient(url, key);
        } catch (e) {
            console.warn("Supabase client init failed in fallback", e);
            return createClient('https://placeholder.supabase.co', 'placeholder-key');
        }
    }
    return _client;
}

export const supabase = new Proxy({} as SupabaseClient, {
    get(_target, prop) {
        return getClient()[prop as keyof SupabaseClient];
    },
});
