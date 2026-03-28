'use client'

import { useState } from 'react'
import RoleCard from './RoleCard'
import EditRolesDrawer from './EditRolesDrawer'
import { DEMO_ROLES, DEMO_VOLUNTEERS } from './data'

type View = 'overview' | 'volunteers' | 'roster' | 'settings'

const NAV = [
  { id: 'overview',   label: 'Dashboard',      icon: '▦' },
  { id: 'volunteers', label: 'Volunteers',      icon: '♟' },
  { id: 'roster',     label: 'Sunday roster',   icon: '☰' },
  { id: 'settings',   label: 'Settings',        icon: '⚙' },
]

export default function Dashboard() {
  const [view, setView] = useState<View>('overview')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [sendMenuOpen, setSendMenuOpen] = useState(false)
  const [scheduleActive, setScheduleActive] = useState(true)
  const [toast, setToast] = useState('')

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const confirmed = DEMO_ROLES.flatMap(r => r.slots).filter(s => s.status === 'confirmed').length
  const pending = DEMO_ROLES.flatMap(r => r.slots).filter(s => s.status === 'pending' || s.status === 'backup-pending').length
  const declined = DEMO_ROLES.flatMap(r => r.slots).filter(s => s.status === 'declined').length
  const total = DEMO_ROLES.flatMap(r => r.slots).length

  return (
    <div className="flex min-h-screen bg-[#fafaf8]">

      {/* Sidebar */}
      <div className="w-52 bg-[#1e3a5f] flex flex-col flex-shrink-0">
        <div className="px-5 py-5 border-b border-white/10">
          <div className="font-serif text-lg text-white">Confirm<span className="text-[#93c5fd]">Sunday</span></div>
        </div>

        <nav className="flex-1 py-3">
          {NAV.map(item => (
            <button
              key={item.id}
              onClick={() => setView(item.id as View)}
              className={`w-full text-left flex items-center gap-2.5 px-5 py-2.5 text-sm transition-colors
                ${view === item.id
                  ? 'bg-white/10 text-white font-medium'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'}`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="px-5 py-4 border-t border-white/10">
          <div className="text-xs text-white/50 mb-0.5">Grace Community Church</div>
          <div className="text-xs text-white/30">Email + SMS · $29/mo</div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* ── OVERVIEW ── */}
        {view === 'overview' && (
          <>
            <div className="bg-white border-b border-[#e8e6e0] px-7 py-4 flex items-center justify-between">
              <div>
                <h1 className="font-serif text-2xl text-[#1e3a5f]">Good morning, Sarah</h1>
                <p className="text-sm text-gray-400 mt-0.5">Sunday in 3 days · Emails sent Monday 10am</p>
              </div>
              <div className="relative">
                <button
                  onClick={() => setSendMenuOpen(o => !o)}
                  className="bg-white border border-[#e8e6e0] hover:border-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg text-sm transition-colors flex items-center gap-1.5"
                >
                  Send now <span className="text-gray-400 text-xs">▾</span>
                </button>
                {sendMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setSendMenuOpen(false)} />
                    <div className="absolute right-0 top-10 bg-white border border-[#e8e6e0] rounded-xl shadow-lg z-20 w-64 py-1.5 overflow-hidden">
                      <div className="px-4 py-2 text-xs text-gray-400 border-b border-[#e8e6e0]">Manual send — use when needed</div>
                      {[
                        { title: 'Send confirmations now', sub: 'Emails all 8 volunteers immediately' },
                        { title: 'Send reminder to pending', sub: 'Nudges the 3 who haven\'t replied' },
                        { title: 'Send test email to me', sub: 'Preview what volunteers receive' },
                      ].map(opt => (
                        <button
                          key={opt.title}
                          onClick={() => { setSendMenuOpen(false); showToast(opt.title + ' — done!') }}
                          className="w-full text-left px-4 py-3 hover:bg-[#fafaf8] transition-colors"
                        >
                          <div className="text-sm font-medium">{opt.title}</div>
                          <div className="text-xs text-gray-400 mt-0.5">{opt.sub}</div>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="p-6 flex flex-col gap-5">
              {/* Metrics */}
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: 'Confirmed', value: confirmed, color: 'text-[#16a34a]', sub: `of ${total} needed` },
                  { label: 'Pending',   value: pending,   color: 'text-[#d97706]', sub: 'awaiting reply' },
                  { label: 'Declined',  value: declined,  color: 'text-[#dc2626]', sub: 'backup on it' },
                  { label: 'Filled',    value: `${Math.round(confirmed / total * 100)}%`, color: 'text-gray-800', sub: 'on track' },
                ].map(m => (
                  <div key={m.label} className="bg-white border border-[#e8e6e0] rounded-xl p-4">
                    <div className="text-xs text-gray-400 uppercase tracking-wide mb-1.5">{m.label}</div>
                    <div className={`font-serif text-3xl font-semibold ${m.color}`}>{m.value}</div>
                    <div className="text-xs text-gray-400 mt-1">{m.sub}</div>
                  </div>
                ))}
              </div>

              {/* Schedule bar */}
              <div className="bg-white border border-[#e8e6e0] rounded-xl px-5 py-3.5 flex items-center justify-between">
                <div>
                  <div className="text-base font-medium mb-0.5">Auto-schedule is {scheduleActive ? 'active' : 'paused'}</div>
                  <div className="text-sm text-gray-400">Emails every Monday at 10:00 AM · Next send in 4 days</div>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => { setScheduleActive(a => !a); showToast(scheduleActive ? 'Schedule paused' : 'Schedule activated!') }}
                    className={`relative w-11 h-6 rounded-full transition-colors ${scheduleActive ? 'bg-[#16a34a]' : 'bg-[#e8e6e0]'}`}
                  >
                    <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${scheduleActive ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </button>
                  <span className="text-sm text-gray-600">{scheduleActive ? 'Active' : 'Paused'}</span>
                </div>
              </div>

              {/* Role cards */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base font-medium">This Sunday&apos;s roster</h2>
                  <button
                    onClick={() => setDrawerOpen(true)}
                    className="text-[#2563eb] text-sm font-medium hover:underline"
                  >
                    Edit roles →
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {DEMO_ROLES.map(role => (
                    <RoleCard key={role.id} role={role} />
                  ))}
                </div>
              </div>

              {/* Reminder nudge */}
              {pending > 0 && (
                <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-xl px-5 py-3.5 flex items-center justify-between">
                  <p className="text-sm text-[#1d4ed8]">
                    Send a reminder to your {pending} pending volunteer{pending !== 1 ? 's' : ''} — response rates jump 60% on Thursday.
                  </p>
                  <button
                    onClick={() => showToast('Reminders sent!')}
                    className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors ml-4 whitespace-nowrap"
                  >
                    Send reminder
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* ── VOLUNTEERS ── */}
        {view === 'volunteers' && (
          <>
            <div className="bg-white border-b border-[#e8e6e0] px-7 py-4 flex items-center justify-between">
              <div>
                <h1 className="font-serif text-2xl text-[#1e3a5f]">Volunteers</h1>
                <p className="text-sm text-gray-400 mt-0.5">{DEMO_VOLUNTEERS.length} volunteers in your roster</p>
              </div>
              <button
                onClick={() => showToast('Add volunteer — coming soon!')}
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors"
              >
                + Add volunteer
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-2">
                {DEMO_VOLUNTEERS.map(v => (
                  <div key={v.id} className="bg-white border border-[#e8e6e0] rounded-xl px-4 py-3.5 flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#eff6ff] rounded-full flex items-center justify-center text-xs font-medium text-[#2563eb] flex-shrink-0">
                      {v.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-base font-medium">{v.name}</div>
                      <div className="text-sm text-gray-400">{v.email}</div>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border
                      ${v.status === 'confirmed' ? 'bg-[#f0fdf4] text-[#16a34a] border-[#bbf7d0]'
                      : v.status === 'pending' ? 'bg-[#fffbeb] text-[#d97706] border-[#fde68a]'
                      : 'bg-[#fef2f2] text-[#dc2626] border-[#fecaca]'}`}>
                      {v.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── SUNDAY ROSTER ── */}
        {view === 'roster' && (
          <>
            <div className="bg-white border-b border-[#e8e6e0] px-7 py-4 flex items-center justify-between">
              <div>
                <h1 className="font-serif text-2xl text-[#1e3a5f]">Sunday roster</h1>
                <p className="text-sm text-gray-400 mt-0.5">Sunday April 6 · Grace Community Church · 9:00 AM</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => showToast('Opening print view...')} className="bg-white border border-[#e8e6e0] hover:border-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg text-sm transition-colors">
                  Print roster
                </button>
                <button onClick={() => showToast('Roster link copied!')} className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors">
                  Share link
                </button>
              </div>
            </div>
            <div className="p-6 max-w-2xl">
              {DEMO_ROLES.map(role => {
                const filled = role.slots.filter(s => s.status === 'confirmed').length
                const total = role.slots.length
                const allGood = filled === total
                return (
                  <div key={role.id} className="bg-white border border-[#e8e6e0] rounded-xl mb-3 overflow-hidden">
                    <div className="bg-[#1e3a5f] px-4 py-2.5 flex items-center justify-between">
                      <span className="text-sm font-medium text-white">{role.name}</span>
                      <span className={`text-xs ${allGood ? 'text-[#93c5fd]' : 'text-[#fde68a]'}`}>
                        {filled}/{total} confirmed
                      </span>
                    </div>
                    {role.slots.filter(s => s.status === 'confirmed').map((slot, i) => (
                      <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-[#f5f4ef] last:border-0">
                        <div className="w-8 h-8 bg-[#eff6ff] rounded-full flex items-center justify-center text-xs font-medium text-[#2563eb]">
                          {slot.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 text-sm font-medium">{slot.name}</div>
                        <span className="text-xs text-[#16a34a]">✓ Confirmed</span>
                      </div>
                    ))}
                    {role.slots.filter(s => s.status !== 'confirmed').map((slot, i) => (
                      <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-[#f5f4ef] last:border-0">
                        <div className="w-8 h-8 bg-[#fffbeb] rounded-full flex items-center justify-center text-xs font-medium text-[#d97706]">?</div>
                        <div className="flex-1 text-sm font-medium text-[#d97706]">
                          {slot.status === 'declined' ? 'Awaiting backup reply' : slot.name}
                        </div>
                        <span className="text-xs text-[#d97706]">⏳ Pending</span>
                      </div>
                    ))}
                  </div>
                )
              })}
              <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl px-4 py-3 text-sm text-[#16a34a]">
                {confirmed} of {total} spots confirmed · {pending} pending · Print this and hand it to your pastor Sunday morning.
              </div>
            </div>
          </>
        )}

        {/* ── SETTINGS ── */}
        {view === 'settings' && (
          <>
            <div className="bg-white border-b border-[#e8e6e0] px-7 py-4">
              <h1 className="font-serif text-2xl text-[#1e3a5f]">Settings</h1>
            </div>
            <div className="p-6 max-w-lg flex flex-col gap-4">
              <div className="bg-white border border-[#e8e6e0] rounded-xl p-5">
                <h2 className="text-base font-medium mb-4">Church details</h2>
                <div className="space-y-4">
                  {[
                    { label: 'Church name', value: 'Grace Community Church' },
                    { label: 'Your name', value: 'Sarah Johnson' },
                    { label: 'Email', value: 'sarah@gracechurch.com' },
                  ].map(f => (
                    <div key={f.label}>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label}</label>
                      <input
                        defaultValue={f.value}
                        className="w-full px-3 py-2.5 border border-[#e8e6e0] rounded-lg text-base bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                      />
                    </div>
                  ))}
                  <button
                    onClick={() => showToast('Settings saved!')}
                    className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-2 px-5 rounded-lg text-sm transition-colors"
                  >
                    Save changes
                  </button>
                </div>
              </div>

              <div className="bg-white border border-[#e8e6e0] rounded-xl p-5">
                <h2 className="text-base font-medium mb-1">Plan</h2>
                <p className="text-sm text-gray-500 mb-4">Email + SMS plan · $29/mo · 11 days left in trial</p>
                <button
                  onClick={() => showToast('Opening billing portal...')}
                  className="bg-white border border-[#e8e6e0] hover:border-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg text-sm transition-colors"
                >
                  Manage billing
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Edit roles drawer */}
      <EditRolesDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSave={() => { setDrawerOpen(false); showToast('Roles saved!') }}
      />

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg z-50 animate-fade-in">
          {toast}
        </div>
      )}
    </div>
  )
}
