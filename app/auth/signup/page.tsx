import Link from 'next/link'
import { signUp } from './actions'

interface PageProps {
  searchParams: Promise<{ error?: string }>
}

export default async function SignupPage({ searchParams }: PageProps) {
  const params = await searchParams
  const error = params.error

  return (
    <div className="min-h-screen bg-[#fafaf8] flex flex-col">
      {/* Top nav */}
      <nav className="px-8 py-5 flex items-center justify-between border-b border-[#e8e6e0]">
        <Link href="/" className="font-serif text-xl font-semibold text-[#1e3a5f]">
          ConfirmSunday
        </Link>
        <span className="text-sm text-gray-500">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-[#2563eb] font-medium hover:underline">
            Sign in
          </Link>
        </span>
      </nav>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-semibold text-[#1e3a5f] mb-2">
              Create your account
            </h1>
            <p className="text-gray-500 text-sm">
              Start your 14-day free trial. No credit card required.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {decodeURIComponent(error)}
            </div>
          )}

          <form action={signUp} className="space-y-5">
            <div>
              <label htmlFor="churchName" className="block text-sm font-medium text-gray-700 mb-1.5">
                Church name
              </label>
              <input
                id="churchName"
                name="churchName"
                type="text"
                required
                placeholder="Grace Community Church"
                className="w-full px-4 py-3 border border-[#e8e6e0] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-gray-400 transition"
              />
            </div>

            <div>
              <label htmlFor="coordinatorName" className="block text-sm font-medium text-gray-700 mb-1.5">
                Your name
              </label>
              <input
                id="coordinatorName"
                name="coordinatorName"
                type="text"
                required
                placeholder="Sarah Johnson"
                className="w-full px-4 py-3 border border-[#e8e6e0] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-gray-400 transition"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="sarah@gracechurch.com"
                className="w-full px-4 py-3 border border-[#e8e6e0] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-gray-400 transition"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                placeholder="At least 8 characters"
                className="w-full px-4 py-3 border border-[#e8e6e0] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-gray-400 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-3 px-6 rounded-lg text-sm transition-colors mt-2"
            >
              Create account &rarr;
            </button>
          </form>

          <p className="mt-6 text-xs text-center text-gray-400">
            By signing up you agree to our{' '}
            <Link href="/terms" className="underline hover:text-gray-600">Terms</Link>
            {' '}and{' '}
            <Link href="/privacy" className="underline hover:text-gray-600">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
