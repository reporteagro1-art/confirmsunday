import Link from 'next/link'

const ROSTER = [
  { role: 'Greeter (2/2)',       people: 'Mark Johnson, Sarah Williams' },
  { role: 'Sound Tech (1/1)',    people: 'James Miller (via backup)'    },
  { role: 'Kids Ministry (3/3)', people: 'Lisa Chen, James Miller, Rachel Brown' },
  { role: 'Parking (2/2)',       people: 'David Park, Mike Torres'      },
]

export default function SundayPage() {
  return (
    <div className="min-h-screen bg-[#f0f4f8] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">

        <div className="text-center mb-8">
          <div className="text-6xl mb-4">☀️</div>
          <h1 className="font-serif text-3xl text-gray-900 mb-2">Sunday morning.</h1>
          <p className="text-base text-gray-500 font-light">Sarah opens her dashboard. Everything is green.</p>
        </div>

        {/* Roster card */}
        <div className="bg-white border border-[#e8e6e0] rounded-2xl p-5 mb-4">
          <div className="text-xs text-gray-400 uppercase tracking-wide mb-4">
            Sunday April 6 · 9:00 AM · Grace Community Church
          </div>
          <div className="flex flex-col gap-2">
            {ROSTER.map(row => (
              <div key={row.role} className="bg-[#f0fdf4] rounded-xl px-4 py-3 flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-medium text-gray-900">{row.role}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{row.people}</div>
                </div>
                <span className="text-xs text-[#16a34a] font-medium whitespace-nowrap mt-0.5">✓ All confirmed</span>
              </div>
            ))}
          </div>
        </div>

        {/* All clear banner */}
        <div className="bg-[#1e3a5f] rounded-2xl px-5 py-5 text-center mb-6">
          <h2 className="font-serif text-xl text-[#e0f2fe] mb-1">All 11 spots confirmed.</h2>
          <p className="text-sm text-[#93c5fd] font-light">No chasing. No panic. No stress. Just coffee.</p>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-gray-600 border border-[#e8e6e0] bg-white rounded-lg px-4 py-2.5 transition-colors"
          >
            ← Back to all screens
          </Link>
        </div>
      </div>
    </div>
  )
}
