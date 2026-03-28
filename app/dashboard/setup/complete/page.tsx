import Link from 'next/link'

export default function GoLivePage() {
  return (
    <div className="min-h-screen bg-[#f5f4ef] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white border border-[#e8e6e0] rounded-2xl overflow-hidden shadow-sm">

        {/* Header */}
        <div className="bg-[#1e3a5f] px-8 py-8 text-center">
          <div className="w-14 h-14 bg-[#16a34a] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl">
            ✓
          </div>
          <h1 className="font-serif text-2xl font-semibold text-white mb-1">
            You&apos;re live!
          </h1>
          <p className="text-[#93c5fd] text-sm font-light">
            Grace Community Church is all set up.
          </p>
        </div>

        {/* Timeline */}
        <div className="px-7 py-6">
          <p className="text-xs font-medium text-gray-500 mb-5 uppercase tracking-wide">
            Here&apos;s exactly what happens next:
          </p>

          <div className="flex flex-col">
            {[
              {
                icon: '1',
                title: 'Monday at 10:00 AM',
                desc: 'Confirmation emails go out to all your volunteers — personalized with their name, role, and service time.',
                line: true,
              },
              {
                icon: '2',
                title: 'Monday – Thursday',
                desc: 'Volunteers reply YES or NO. Backups cascade automatically if needed. Your dashboard updates in real time.',
                line: true,
              },
              {
                icon: '3',
                title: 'Friday at 7:00 PM',
                desc: 'You get an SMS summary — confirmed spots, pending, anything that needs attention.',
                line: true,
              },
              {
                icon: '☀',
                title: 'Sunday morning',
                desc: 'Open your dashboard. See everything green. Make coffee.',
                green: true,
                line: false,
              },
            ].map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium z-10
                    ${step.green ? 'bg-[#16a34a] text-white' : 'bg-[#eff6ff] border border-[#bfdbfe] text-[#2563eb]'}`}>
                    {step.icon}
                  </div>
                  {step.line && <div className="w-px flex-1 bg-[#e8e6e0] my-1" style={{ minHeight: 20 }} />}
                </div>
                <div className="pb-5 flex-1">
                  <div className="text-sm font-medium mb-1">{step.title}</div>
                  <div className="text-xs text-gray-500 font-light leading-relaxed">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Test email notice */}
          <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg px-4 py-3 text-xs text-[#16a34a] mb-5 font-light">
            We sent a test email to your address so you can see what your volunteers will receive.
          </div>

          <Link
            href="/dashboard"
            className="block w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-3 px-6 rounded-lg text-sm text-center transition-colors"
          >
            Go to my dashboard →
          </Link>

          <div className="text-center mt-3">
            <Link href="/dashboard/setup" className="text-xs text-gray-400 hover:text-gray-600">
              Change schedule settings
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
