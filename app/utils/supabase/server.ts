// Purpose: This file provides functions to create a Supabase client for server-side components, handling cookies.

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const createClient = (cookieStore: ReturnType<typeof cookies>) => {
  // Create a Supabase client for server-side components
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // Define methods for cookie operations
      cookies: {
        get(name: string) {
          // Retrieve a cookie value from the cookie store
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            // Attempt to set a cookie value in the cookie store
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Error handling for server components attempting to set cookies
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            // Attempt to remove a cookie by setting its value to empty
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // Error handling for server components attempting to remove cookies
          }
        },
      },
    }
  );
};