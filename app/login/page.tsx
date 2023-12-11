// Import necessary modules from Next.js for linking, headers, and navigation.
import Link from 'next/link'
import { headers, cookies } from 'next/headers'
import { createClient } from '@/app/utils/supabase/server'
import { redirect } from 'next/navigation'

// The main function for the login page that accepts 'searchParams' from the URL query.
export default function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  // This function is called when the user submits the sign-in form.
  const signIn = async (formData: FormData) => {
    'use server'  // Tells Next.js to run this code on the server.

    // Extract the email and password from the form data.
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    // Retrieve the cookie store from the headers.
    const cookieStore = cookies()
    // Create a Supabase client to interact with Supabase services.
    const supabase = createClient(cookieStore)

    // Attempt to sign in the user with the provided email and password.
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    // If there's an error, redirect back to the login page with an error message.
    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    // If sign-in is successful, redirect the user to the homepage.
    return redirect('/subscribe')
  }

  // This function is called when the user submits the sign-up form.
  const signUp = async (formData: FormData) => {
    'use server'  // Again, this ensures the code runs on the server.

    // Get the origin of the request from the headers to construct a callback URL.
    const origin = headers().get('origin')
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    // Attempt to sign up the user with the provided email and password.
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    // If there's an error, redirect back to the login page with an error message.
    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    // If sign-up is successful, instruct the user to check their email to continue.
    return redirect('/login?message=Check email to continue sign in process')
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{' '}
        Back
      </Link>

      <form
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action={signIn}
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
          Sign In
        </button>
        <button
          formAction={signUp}
          className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
        >
          Sign Up
        </button>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  )
}