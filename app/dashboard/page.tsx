import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { signOut } from '@/app/auth/login/actions'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { data: coordinator } = await supabase
    .from('coordinators')
    .select('name, churches(name)')
    .eq('user_id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      <nav className="px-8 py-5 flex items-center justify-between border-b border-[#e8e6e0] bg-white">
        <span className="font-serif text-xl font-semibold text-[#1e3a5f]">ConfirmSunday</span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            {coordinator?.name} &middot; {(coordinator?.churches as any)?.name}
          </span>
          <form action={signOut}>
            <button type="submit" className="text-sm text-gray-500 hover:text-gray-700">
              Sign out
            </button>
          </form>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#2563eb]/10 rounded-full mb-6">
          <svg className="w-8 h-8 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="font-serif text-3xl font-semibold text-[#1e3a5f] mb-3">
          You&apos;re in, {coordinator?.name?.split(' ')[0]}!
        </h1>
        <p className="text-gray-500 mb-8">
          Next step: set up your volunteers, roles, and schedule.
        </p>
        <a
          href="/dashboard/setup"
          className="inline-block bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-3 px-8 rounded-lg text-sm transition-colors"
        >
          Start setup wizard &rarr;
        </a>
      </div>
    </div>
  )
}
