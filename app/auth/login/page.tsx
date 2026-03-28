import Link from 'next/link'
import { signIn } from './actions'

interface PageProps {
  searchParams: Promise<{ error?: string; message?: string }>
}

export default async function LoginPage({ searchParams }: PageProps) {
  const params = await searchParams
  const error = params.error
  const message = params.message

  return (
    <div className="min-h-screen bg-[#fafaf8] flex flex-col">
      <nav className="px-8 py-5 flex items-center justify-between border-b border-[#e8e6e0]">
        <Link href="/" className="font-serif text-xl font-semibold text-[#1e3a5f]">
          ConfirmSunday
        </Link>
        <span className="text-base text-gray-500">
          New here?{' '}
          <Link href="/auth/signup" className="text-[#2563eb] font-medium hover:underline">
            Start free trial
          </Link>
        </span>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-semibold text-[#1e3a5f] mb-2">
              Welcome back
            </h1>
            <p className="text-gray-500 text-base">
              Sign in to your ConfirmSunday account.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-base">
              {decodeURIComponent(error)}
            </div>
          )}

          {message && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-base">
              {decodeURIComponent(message)}
            </div>
          )}

          <form action={signIn} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-1.5">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="sarah@gracechurch.com"
                className="w-full px-4 py-3 border border-[#e8e6e0] rounded-lg text-base bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-gray-400 transition"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Your password"
                className="w-full px-4 py-3 border border-[#e8e6e0] rounded-lg text-base bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-gray-400 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-3.5 px-6 rounded-lg text-base transition-colors mt-2"
            >
              Sign in &rarr;
            </button>
          </form>

          <p className="mt-5 text-base text-center text-gray-500">
            <Link href="/auth/forgot-password" className="hover:underline">
              Forgot your password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
