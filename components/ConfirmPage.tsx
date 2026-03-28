'use client'

import { useState } from 'react'
import Link from 'next/link'

type State = 'pending' | 'confirmed' | 'declined' | 'cancelled'

interface Props {
  alreadyConfirmed?: boolean
}

export default function ConfirmPage({ alreadyConfirmed = false }: Props) {
  const [state, setState] = useState<State>(alreadyConfirmed ? 'confirmed' : 'pending')
  const [showCancelWarning, setShowCancelWarning] = useState(false)

  const detail = {
    name: 'Mark',
    role: 'Sound Tech',
    date: 'Sunday, April 6',
    time: '9:00 AM',
    church: 'Grace Community Church',
  }

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex flex-col items-center justify-center px-4 py-10">

      {/* Phone-style frame */}
      <div className="w-full max-w-sm bg-white rounded-3xl border border-[#e8e6e0] overflow-hidden shadow-sm">

        {/* Email header */}
        <div className={`px-5 py-4 ${state === 'confirmed' || alreadyConfirmed ? 'bg-[#15803d]' : 'bg-[#1e3a5f]'}`}>
          <div className="flex justify-between text-xs text-white/50 mb-2">
            <span>Grace Community Church</span>
            <span>via ConfirmSunday</span>
          </div>
          <div className="text-white font-medium text-sm">
            {state === 'confirmed' || alreadyConfirmed
              ? 'Your Sunday confirmation'
              : 'Can you serve this Sunday?'}
          </div>
          <div className="text-white/50 text-xs mt-0.5">noreply@confirmsunday.com</div>
        </div>

        {/* Body */}
        <div className="px-5 py-6">

          {/* ── PENDING ── */}
          {state === 'pending' && (
            <div>
              <h2 className="font-serif text-2xl text-gray-900 mb-1">Hi {detail.name}!</h2>
              <p className="text-sm text-gray-500 mb-4 font-light">You&apos;re scheduled to serve this Sunday:</p>

              <div className="bg-[#f5f4ef] rounded-xl p-4 mb-5 text-sm">
                {[
                  { label: 'Role', value: detail.role },
                  { label: 'Date', value: detail.date },
                  { label: 'Time', value: detail.time },
                  { label: 'Where', value: detail.church },
                ].map(row => (
                  <div key={row.label} className="flex gap-3 mb-1.5 last:mb-0">
                    <span className="text-gray-400 w-12 flex-shrink-0">{row.label}</span>
                    <span className="font-medium text-gray-900">{row.value}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setState('confirmed')}
                className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-medium py-4 rounded-xl text-base transition-colors mb-3"
              >
                Yes, I&apos;ll be there! ✓
              </button>
              <button
                onClick={() => setState('declined')}
                className="w-full bg-white border-2 border-[#dc2626] text-[#dc2626] hover:bg-[#fef2f2] font-medium py-3.5 rounded-xl text-base transition-colors"
              >
                Sorry, I can&apos;t make it
              </button>

              <p className="text-xs text-gray-400 text-center mt-4 leading-relaxed">
                No login needed · One tap is all it takes<br />
                <Link href="/" className="text-[#2563eb]">Organizing a team? Try ConfirmSunday free</Link>
              </p>
            </div>
          )}

          {/* ── JUST CONFIRMED ── */}
          {state === 'confirmed' && !alreadyConfirmed && (
            <div className="text-center py-4">
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="font-serif text-2xl text-gray-900 mb-2">You&apos;re confirmed!</h2>
              <p className="text-sm text-gray-500 font-light mb-5">
                Thanks {detail.name} — see you Sunday at {detail.time} for {detail.role}. Calendar invite on its way.
              </p>
              <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl px-4 py-3 text-sm text-[#16a34a] mb-5">
                Calendar invite sent to mark@gmail.com
              </div>
              <button
                onClick={() => setState('pending')}
                className="text-sm text-gray-400 hover:text-gray-600 border border-[#e8e6e0] rounded-lg py-2 px-4 transition-colors"
              >
                ← Go back
              </button>
            </div>
          )}

          {/* ── ALREADY CONFIRMED (late cancel state) ── */}
          {state === 'confirmed' && alreadyConfirmed && (
            <div>
              <h2 className="font-serif text-2xl text-gray-900 mb-1">Hi {detail.name}!</h2>
              <p className="text-sm text-gray-500 mb-4 font-light">You&apos;re confirmed for this Sunday:</p>

              <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl px-4 py-3 flex items-center gap-3 mb-4">
                <div className="w-6 h-6 bg-[#16a34a] rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">✓</div>
                <div>
                  <div className="text-sm font-medium text-[#16a34a]">{detail.role} — confirmed</div>
                  <div className="text-xs text-[#16a34a]">{detail.date} · {detail.time}</div>
                </div>
              </div>

              <div className="bg-[#f5f4ef] rounded-xl p-4 mb-5 text-sm">
                {[
                  { label: 'Role', value: detail.role },
                  { label: 'Date', value: detail.date },
                  { label: 'Time', value: detail.time },
                  { label: 'Where', value: detail.church },
                ].map(row => (
                  <div key={row.label} className="flex gap-3 mb-1.5 last:mb-0">
                    <span className="text-gray-400 w-12 flex-shrink-0">{row.label}</span>
                    <span className="font-medium text-gray-900">{row.value}</span>
                  </div>
                ))}
              </div>

              {!showCancelWarning ? (
                <button
                  onClick={() => setShowCancelWarning(true)}
                  className="w-full text-sm text-gray-400 hover:text-gray-600 text-center py-2 transition-colors"
                >
                  Something came up? Let us know →
                </button>
              ) : (
                <div>
                  <div className="bg-[#fef2f2] border border-[#fecaca] rounded-xl px-4 py-3 text-sm text-[#991b1b] mb-4 leading-relaxed">
                    Cancelling will notify your backup and alert the coordinator right away. Please only cancel if you truly can&apos;t make it.
                  </div>
                  <button
                    onClick={() => setState('cancelled')}
                    className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-medium py-4 rounded-xl text-base transition-colors mb-2"
                  >
                    I can no longer make it
                  </button>
                  <button
                    onClick={() => setShowCancelWarning(false)}
                    className="w-full text-sm text-gray-400 hover:text-gray-600 py-2 transition-colors"
                  >
                    Never mind, I&apos;ll be there
                  </button>
                </div>
              )}

              <p className="text-xs text-gray-400 text-center mt-4 leading-relaxed">
                Cancelling triggers the backup list automatically.<br />The coordinator will be notified right away.
              </p>
            </div>
          )}

          {/* ── DECLINED ── */}
          {state === 'declined' && (
            <div className="text-center py-4">
              <div className="text-5xl mb-4">👍</div>
              <h2 className="font-serif text-2xl text-gray-900 mb-2">No problem!</h2>
              <p className="text-sm text-gray-500 font-light mb-5">
                Thanks for letting us know. We&apos;ve already notified your backup — everything is handled.
              </p>
              <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-xl px-4 py-3 text-sm text-[#2563eb] mb-5">
                James Miller (B1) has been notified automatically
              </div>
              <button
                onClick={() => setState('pending')}
                className="text-sm text-gray-400 hover:text-gray-600 border border-[#e8e6e0] rounded-lg py-2 px-4 transition-colors"
              >
                ← Go back
              </button>
            </div>
          )}

          {/* ── CANCELLED ── */}
          {state === 'cancelled' && (
            <div className="text-center py-4">
              <div className="text-5xl mb-4">👍</div>
              <h2 className="font-serif text-2xl text-gray-900 mb-2">Got it, no problem.</h2>
              <p className="text-sm text-gray-500 font-light mb-5">
                Thanks for letting us know, {detail.name}. We&apos;ve already started contacting your backup — and the coordinator has been notified.
              </p>
              <div className="bg-[#fef2f2] border border-[#fecaca] rounded-xl px-4 py-3 text-sm text-[#dc2626] mb-3">
                Your spot is now open · Backup cascade started
              </div>
              <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-xl px-4 py-3 text-sm text-[#2563eb] mb-5">
                James Miller (B1) notified · Coordinator alerted by SMS
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Preview toggle — only shown in preview mode */}
      <div className="mt-6 flex gap-3">
        <Link
          href="/confirm/preview"
          className="text-xs text-gray-400 hover:text-gray-600 border border-[#e8e6e0] bg-white rounded-lg px-3 py-2 transition-colors"
        >
          View pending state
        </Link>
        <Link
          href="/confirm/preview?state=confirmed"
          className="text-xs text-gray-400 hover:text-gray-600 border border-[#e8e6e0] bg-white rounded-lg px-3 py-2 transition-colors"
        >
          View already-confirmed state
        </Link>
      </div>
    </div>
  )
}
