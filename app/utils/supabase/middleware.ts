import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const publicUrls = ['/subscribe', '/unsubscribe', '/login']

  if (publicUrls.includes(req.nextUrl.pathname)) {
    return res;
  }

  const supabase = createMiddlewareClient({ req, res });

  const {
    data: {
      session
    }
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.rewrite(new URL('/login', req.url))
  }
}

// // Purpose: This file sets up server-side middleware to manage authentication and cookies.

// import { createServerClient, type CookieOptions } from '@supabase/ssr';
// import { type NextRequest, NextResponse } from 'next/server';

// export const createClient = (request: NextRequest) => {
//   // Create an unmodified response that will be used to alter cookies later
//   let response = NextResponse.next({
//     request: {
//       headers: request.headers,
//     },
//   });

//   // Create a Supabase client for server-side interactions, such as authentication
//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       // Define cookie methods to manage authentication tokens
//       cookies: {
//         get(name: string) {
//           // Get a cookie value by name from the incoming request
//           return request.cookies.get(name)?.value;
//         },
//         set(name: string, value: string, options: CookieOptions) {
//           // Set a cookie value, which updates the request and response
//           request.cookies.set({
//             name,
//             value,
//             ...options,
//           });
//           // Update the response to reflect the new cookie value
//           response = NextResponse.next({
//             request: {
//               headers: request.headers,
//             },
//           });
//           response.cookies.set({
//             name,
//             value,
//             ...options,
//           });
//         },
//         remove(name: string, options: CookieOptions) {
//           // Remove a cookie by setting its value to an empty string
//           request.cookies.set({
//             name,
//             value: '',
//             ...options,
//           });
//           // Update the response to reflect the cookie removal
//           response = NextResponse.next({
//             request: {
//               headers: request.headers,
//             },
//           });
//           response.cookies.set({
//             name,
//             value: '',
//             ...options,
//           });
//         },
//       },
//     }
//   );

//   // Return the Supabase client and the updated response
//   return { supabase, response };
// };