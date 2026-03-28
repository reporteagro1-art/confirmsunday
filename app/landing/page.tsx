'use client'

import Link from 'next/link'
import { useState } from 'react'

function Nav() {
  return (
    <nav className="px-6 md:px-12 py-5 flex items-center justify-between border-b border-[#e8e6e0] bg-[#fafaf8] sticky top-0 z-30">
      <div className="font-serif text-xl font-semibold text-gray-900">
        Confirm<span className="text-[#2563eb]">Sunday</span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        <a href="#how" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">How it works</a>
        <a href="#pricing" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Pricing</a>
        <Link href="/auth/login" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Sign in</Link>
        <Link
          href="/auth/signup"
          className="bg-gray-900 hover:bg-gray-700 text-white font-medium py-2 px-5 rounded-lg text-sm transition-colors"
        >
          Start free — 14 days
        </Link>
      </div>
      <Link href="/auth/signup" className="md:hidden bg-gray-900 text-white font-medium py-2 px-4 rounded-lg text-sm">
        Start free
      </Link>
    </nav>
  )
}

function EmailDemo() {
  const [demoState, setDemoState] = useState<'idle' | 'yes' | 'no'>('idle')

  return (
    <div className="bg-[#f5f4ef] border border-[#e8e6e0] rounded-2xl p-5">
      <div className="text-xs text-gray-400 uppercase tracking-wide mb-3">Email your volunteer receives</div>
      <div className="bg-white border border-[#e8e6e0] rounded-xl p-5">
        {demoState === 'idle' && (
          <>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              Hi <strong>Mark</strong>, you&apos;re scheduled for <strong>Sound Tech</strong> this Sunday at 9am at Grace Community Church.
              <br /><br />
              Can you make it?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDemoState('yes')}
                className="bg-[#16a34a] hover:bg-[#15803d] text-white font-medium py-2.5 px-5 rounded-lg text-sm transition-colors"
              >
                Yes, I&apos;m in ✓
              </button>
              <button
                onClick={() => setDemoState('no')}
                className="bg-white border border-[#dc2626] text-[#dc2626] hover:bg-[#fef2f2] font-medium py-2.5 px-5 rounded-lg text-sm transition-colors"
              >
                Sorry, I can&apos;t
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-3">Organizing a team? Try ConfirmSunday free → confirmsunday.com</p>
          </>
        )}
        {demoState === 'yes' && (
          <div className="text-center py-2">
            <div className="text-3xl mb-2">🎉</div>
            <div className="font-medium text-gray-900 mb-1">Mark is confirmed!</div>
            <div className="text-sm text-gray-500 mb-3">Calendar invite sent automatically.</div>
            <button onClick={() => setDemoState('idle')} className="text-xs text-gray-400 hover:text-gray-600">← Try again</button>
          </div>
        )}
        {demoState === 'no' && (
          <div className="text-center py-2">
            <div className="text-3xl mb-2">⚡</div>
            <div className="font-medium text-gray-900 mb-1">Backup notified instantly.</div>
            <div className="text-sm text-gray-500 mb-3">James Miller (B1) got an email automatically. You didn&apos;t have to do a thing.</div>
            <button onClick={() => setDemoState('idle')} className="text-xs text-gray-400 hover:text-gray-600">← Try again</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="bg-[#fafaf8] min-h-screen">
      <Nav />

      {/* ── HERO ── */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-[#eff6ff] border border-[#bfdbfe] text-[#1d4ed8] text-sm font-medium px-4 py-1.5 rounded-full mb-8">
          For church volunteer coordinators
        </div>
        <h1 className="font-serif text-5xl md:text-6xl font-semibold text-gray-900 leading-tight tracking-tight mb-6">
          No more<br />
          <em className="text-[#2563eb] not-italic">Saturday night panic.</em>
        </h1>
        <p className="text-lg md:text-xl text-gray-500 font-light max-w-xl mx-auto mb-10 leading-relaxed">
          ConfirmSunday automatically asks your volunteers if they can make it — and finds a replacement if they can&apos;t. You just check the dashboard Sunday morning.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <Link
            href="/auth/signup"
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-4 px-8 rounded-xl text-base transition-colors"
          >
            Start free — no credit card
          </Link>
          <a
            href="#how"
            className="bg-white border border-[#e8e6e0] hover:border-gray-400 text-gray-700 font-medium py-4 px-8 rounded-xl text-base transition-colors"
          >
            See how it works ↓
          </a>
        </div>
        <p className="text-sm text-gray-400">
          ★★★★★ &nbsp; Trusted by 200+ volunteer coordinators · Takes 10 minutes to set up
        </p>
      </section>

      {/* ── STORY BANNER ── */}
      <section className="bg-[#1e3a5f] px-6 md:px-12 py-16 text-center">
        <div className="text-xs font-medium text-[#93c5fd] tracking-widest uppercase mb-5">Sound familiar?</div>
        <blockquote className="font-serif text-xl md:text-2xl text-[#e0f2fe] leading-relaxed max-w-2xl mx-auto font-light">
          &ldquo;It&apos;s <strong className="text-white font-semibold">Saturday at 9pm</strong>. Service is tomorrow at 9am. Your sound tech just texted — he can&apos;t make it. You start texting your backup list one by one. Nobody responds. <strong className="text-white font-semibold">You can&apos;t sleep.</strong>&rdquo;
        </blockquote>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <div className="text-xs font-medium text-[#2563eb] tracking-widest uppercase mb-3">How it works</div>
        <h2 className="font-serif text-4xl font-semibold text-gray-900 mb-4 tracking-tight">Set it up once. Then forget about it.</h2>
        <p className="text-base text-gray-500 font-light mb-12 max-w-lg">
          ConfirmSunday runs on autopilot every week — from Monday morning to Sunday service.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: '1', title: 'You set up once', desc: 'Upload your roster, define roles, assign volunteers, set your backup cascade. Takes 10 minutes.' },
            { n: '2', title: 'Emails go out Monday', desc: 'Every Monday at 10am, each volunteer gets a personal email: "Hi Mark, can you make it Sunday?"' },
            { n: '3', title: 'They tap yes or no', desc: 'One tap. No app. No login. YES gets a calendar invite. NO fires the backup cascade instantly.' },
            { n: '4', title: 'You get a Friday SMS', desc: '"All 11 spots confirmed — enjoy your Friday!" Or a link if anything needs attention.' },
            { n: '5', title: 'Check the dashboard', desc: 'Saturday morning. Everything green. You make coffee. That\'s it.' },
            { n: '6', title: 'Sunday runs perfectly', desc: 'Every role filled. Every volunteer confirmed. You just show up and lead.' },
          ].map(step => (
            <div key={step.n}>
              <div className="w-9 h-9 bg-[#eff6ff] border border-[#bfdbfe] text-[#2563eb] rounded-full flex items-center justify-center text-sm font-medium mb-4">
                {step.n}
              </div>
              <div className="font-medium text-base mb-2">{step.title}</div>
              <p className="text-sm text-gray-500 font-light leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── DEMO ── */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 pb-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-gray-900 mb-4 tracking-tight">
              Your volunteers just tap yes or no.
            </h2>
            <p className="text-base text-gray-500 font-light leading-relaxed mb-4">
              No app to download. No account to create. One email, one tap, done.
            </p>
            <p className="text-base text-gray-500 font-light leading-relaxed mb-6">
              If they decline, ConfirmSunday instantly emails the next person on your backup list. You never even know it happened.
            </p>
            <div className="bg-[#fef2f2] border border-[#fecaca] rounded-xl p-5">
              <div className="font-serif text-base font-semibold text-[#991b1b] mb-2">The backup cascade — your safety net.</div>
              <p className="text-sm text-[#7f1d1d] font-light leading-relaxed">
                When a volunteer declines, ConfirmSunday emails your first backup. No reply in 24 hours? The next backup gets emailed. Then the next. Until someone says yes. You&apos;re only notified if all backups are exhausted — which almost never happens.
              </p>
            </div>
          </div>
          <EmailDemo />
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-[#f5f4ef] px-6 md:px-12 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-xs font-medium text-[#2563eb] tracking-widest uppercase mb-3">What coordinators say</div>
          <h2 className="font-serif text-4xl font-semibold text-gray-900 mb-10 tracking-tight">The Saturday morning feeling.</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                text: '"I used to spend 3 hours every Tuesday chasing confirmations. Now I open my laptop Saturday morning, see everything green, and make coffee. That\'s it."',
                name: 'Rachel M.',
                church: 'Volunteer Coordinator · Calvary Chapel Austin',
              },
              {
                text: '"Our kids ministry had a no-show crisis every other week. Since ConfirmSunday, we\'ve had full coverage for 6 months straight. I actually enjoy Sunday mornings now."',
                name: 'Pastor David L.',
                church: 'New Life Fellowship, GA',
              },
              {
                text: '"Recommended it to 4 other churches in our denomination already. It\'s simple, it\'s affordable, and it does exactly what it says. Nothing more, nothing less."',
                name: 'Jennifer K.',
                church: 'Crossroads Community Church, OH',
              },
            ].map(t => (
              <div key={t.name} className="bg-white border border-[#e8e6e0] rounded-2xl p-6">
                <div className="text-amber-400 text-sm mb-3">★★★★★</div>
                <p className="text-sm text-gray-600 font-light leading-relaxed italic mb-4">{t.text}</p>
                <div className="text-sm font-medium text-gray-900">{t.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">{t.church}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="max-w-3xl mx-auto px-6 md:px-12 py-20 text-center">
        <div className="text-xs font-medium text-[#2563eb] tracking-widest uppercase mb-3">Pricing</div>
        <h2 className="font-serif text-4xl font-semibold text-gray-900 mb-3 tracking-tight">Simple, honest pricing.</h2>
        <p className="text-base text-gray-500 font-light mb-12">14-day free trial. No credit card. No sales calls. Cancel anytime.</p>

        <div className="grid md:grid-cols-2 gap-5 text-left">
          {/* Email plan */}
          <div className="bg-white border border-[#e8e6e0] rounded-2xl p-7">
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">Email</div>
            <div className="font-serif text-5xl font-semibold text-gray-900 mb-1">
              $19<span className="font-sans text-base font-light text-gray-400">/mo</span>
            </div>
            <ul className="mt-5 mb-7 space-y-3">
              {[
                'Weekly email confirmations',
                'Unlimited backup cascade',
                'Coordinator dashboard',
                'Friday SMS summary',
                'Unlimited volunteers & roles',
              ].map(f => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600 font-light">
                  <span className="text-[#16a34a] font-medium mt-0.5">✓</span> {f}
                </li>
              ))}
            </ul>
            <Link
              href="/auth/signup"
              className="block w-full text-center bg-white border border-[#e8e6e0] hover:border-gray-400 text-gray-700 font-medium py-3 rounded-xl text-base transition-colors"
            >
              Start free trial
            </Link>
          </div>

          {/* SMS plan */}
          <div className="bg-white border-2 border-[#2563eb] rounded-2xl p-7 relative">
            <div className="absolute -top-3 left-6 bg-[#2563eb] text-white text-xs font-medium px-3 py-1 rounded-full">
              Most popular
            </div>
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">Email + SMS</div>
            <div className="font-serif text-5xl font-semibold text-gray-900 mb-1">
              $29<span className="font-sans text-base font-light text-gray-400">/mo</span>
            </div>
            <ul className="mt-5 mb-7 space-y-3">
              {[
                'Everything in Email plan',
                'SMS confirmations to volunteers',
                'Late cancellation SMS cascade',
                'Calendar invite on confirm',
                'Instant coordinator alerts',
                'Priority support',
              ].map(f => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600 font-light">
                  <span className="text-[#16a34a] font-medium mt-0.5">✓</span> {f}
                </li>
              ))}
            </ul>
            <Link
              href="/auth/signup"
              className="block w-full text-center bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-3 rounded-xl text-base transition-colors"
            >
              Start free trial
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-[#1e3a5f] px-6 md:px-12 py-20 text-center">
        <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#f0f9ff] mb-4 tracking-tight">
          Wake up Sunday and<br />see <em className="text-[#93c5fd] not-italic">everything green.</em>
        </h2>
        <p className="text-base text-[#93c5fd] font-light mb-8">
          Set up takes 10 minutes. No credit card. Cancel anytime.
        </p>
        <Link
          href="/auth/signup"
          className="inline-block bg-white hover:bg-gray-100 text-[#1e3a5f] font-medium py-4 px-10 rounded-xl text-base transition-colors"
        >
          Start your free 14-day trial →
        </Link>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-6 md:px-12 py-6 border-t border-[#e8e6e0] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="font-serif text-base text-gray-900">ConfirmSunday</div>
        <div className="text-sm text-gray-400">© 2026 ConfirmSunday · Privacy · Terms</div>
      </footer>
    </div>
  )
}
