import Link from 'next/link'

const screens = [
  { label: 'Sign up', path: '/auth/signup', desc: 'New coordinator account creation' },
  { label: 'Log in', path: '/auth/login', desc: 'Returning coordinator' },
  { label: 'Setup wizard', path: '/dashboard/setup', desc: '5-step onboarding flow' },
  { label: "You're live", path: '/dashboard/setup/complete', desc: 'After setup is done' },
  { label: 'Dashboard', path: '/dashboard', desc: 'Weekly status view' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafaf8] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="font-serif text-2xl font-semibold text-[#1e3a5f] mb-1 text-center">
          ConfirmSunday
        </h1>
        <p className="text-gray-400 text-xs text-center mb-8">Screen preview</p>

        <div className="flex flex-col gap-2">
          {screens.map(s => (
            <Link
              key={s.path}
              href={s.path}
              className="bg-white border border-[#e8e6e0] hover:border-[#2563eb] rounded-xl px-4 py-3 flex items-center justify-between group transition-colors"
            >
              <div>
                <div className="text-sm font-medium group-hover:text-[#2563eb] transition-colors">{s.label}</div>
                <div className="text-xs text-gray-400">{s.desc}</div>
              </div>
              <span className="text-gray-300 group-hover:text-[#2563eb] transition-colors">→</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
