// Purpose: This file creates a Supabase client for use on the client-side (browser).

import { createBrowserClient } from '@supabase/ssr';

export const createClient = () =>
  // Instantiate a Supabase client for client-side operations
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );