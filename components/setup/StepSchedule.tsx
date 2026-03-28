'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Schedule {
  sendDay: string
  sendHour: string
  serviceTime: string
  timezone: string
}

interface Props {
  schedule: Schedule
  onChange: (s: Schedule) => void
  onBack: () => void
}

const TIMEZONES = [
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'America/Phoenix', label: 'Arizona (MT, no DST)' },
  { value: 'Pacific/Honolulu', label: 'Hawaii (HT)' },
]

export default function StepSchedule({ schedule, onChange, onBack }: Props) {
  const router = useRouter()
  const [form, setForm] = useState(schedule)
  const [testSent, setTestSent] = useState(false)
  const [loading, setLoading] = useState(false)

  function update(key: keyof Schedule, value: string) {
    const updated = { ...form, [key]: value }
    setForm(updated)
    onChange(updated)
  }

  async function handleGoLive() {
    setLoading(true)
    // Small delay for feel — real save happens here in Step 2
    await new Promise(r => setTimeout(r, 800))
    router.push('/dashboard/setup/complete')
  }

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-[#1e3a5f] mb-2">
        Set your schedule
      </h1>
      <p className="text-gray-500 text-sm mb-6 font-light">
        When should ConfirmSunday send emails each week? You can change this any time.
      </p>

      <div className="bg-white border border-[#e8e6e0] rounded-xl p-5 mb-5">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Send confirmations on
            </label>
            <select
              value={form.sendDay}
              onChange={e => update('sendDay', e.target.value)}
              className="w-full px-3 py-2.5 border border-[#e8e6e0] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
            >
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
            </select>
            <div className="mt-1.5 bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg px-2.5 py-1.5 text-[11px] text-[#16a34a] font-light">
              Recommended — 89% avg confirmation rate
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              At what time
            </label>
            <select
              value={form.sendHour}
              onChange={e => update('sendHour', e.target.value)}
              className="w-full px-3 py-2.5 border border-[#e8e6e0] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
            >
              <option>9:00 AM</option>
              <option>10:00 AM</option>
              <option>12:00 PM</option>
              <option>2:00 PM</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Your service time
            </label>
            <select
              value={form.serviceTime}
              onChange={e => update('serviceTime', e.target.value)}
              className="w-full px-3 py-2.5 border border-[#e8e6e0] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
            >
              <option>8:00 AM</option>
              <option>9:00 AM</option>
              <option>10:00 AM</option>
              <option>10:30 AM</option>
              <option>11:00 AM</option>
              <option>11:30 AM</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Your timezone
            </label>
            <select
              value={form.timezone}
              onChange={e => update('timezone', e.target.value)}
              className="w-full px-3 py-2.5 border border-[#e8e6e0] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
            >
              {TIMEZONES.map(tz => (
                <option key={tz.value} value={tz.value}>{tz.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-[#f5f4ef] rounded-lg px-4 py-3 text-xs text-gray-600 font-light">
          Confirmation emails will go out every{' '}
          <strong className="text-gray-900">{form.sendDay} at {form.sendHour}</strong>.
          {' '}Volunteers reply for your{' '}
          <strong className="text-gray-900">Sunday {form.serviceTime}</strong> service.
          {' '}If no reply by Thursday, we&apos;ll send a nudge automatically.
        </div>
      </div>

      {/* Test email */}
      <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-xl p-4 mb-6">
        <div className="text-sm font-medium text-[#1d4ed8] mb-1">
          Send a test email to yourself
        </div>
        <div className="text-xs text-[#1d4ed8] font-light mb-3">
          See exactly what your volunteers will receive before anything goes live.
        </div>
        {testSent ? (
          <div className="text-xs text-[#16a34a] font-medium">✓ Test email sent — check your inbox!</div>
        ) : (
          <button
            onClick={() => setTestSent(true)}
            className="bg-white border border-[#bfdbfe] hover:border-[#2563eb] text-[#2563eb] font-medium py-2 px-4 rounded-lg text-xs transition-colors"
          >
            Send test email
          </button>
        )}
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="bg-white border border-[#e8e6e0] hover:border-gray-400 text-gray-700 font-medium py-3 px-6 rounded-lg text-sm transition-colors">
          ← Back
        </button>
        <button
          onClick={handleGoLive}
          disabled={loading}
          className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-3 px-8 rounded-lg text-sm transition-colors disabled:opacity-70"
        >
          {loading ? 'Setting up...' : 'Go live! →'}
        </button>
      </div>
    </div>
  )
}
