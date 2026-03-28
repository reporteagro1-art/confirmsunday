'use client'

import { useState } from 'react'
import StepWelcome from './StepWelcome'
import StepVolunteers from './StepVolunteers'
import StepRoles from './StepRoles'
import StepAssign from './StepAssign'
import StepSchedule from './StepSchedule'

export type Volunteer = { id: string; name: string; email: string }
export type Role = { id: string; name: string; slots: number }
export type BackupEntry = { volunteerId: string }
export type Assignment = {
  roleId: string
  primaryIds: string[]
  backups: BackupEntry[]
}

export type SetupData = {
  volunteers: Volunteer[]
  roles: Role[]
  assignments: Assignment[]
  schedule: {
    sendDay: string
    sendHour: string
    serviceTime: string
    timezone: string
  }
}

const STEPS = ['Welcome', 'Volunteers', 'Roles', 'Assign', 'Schedule']

export default function SetupWizard() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<SetupData>({
    volunteers: [],
    roles: [],
    assignments: [],
    schedule: {
      sendDay: 'Monday',
      sendHour: '10:00 AM',
      serviceTime: '9:00 AM',
      timezone: 'America/Chicago',
    },
  })

  function next() { setStep(s => Math.min(s + 1, 5)) }
  function back() { setStep(s => Math.max(s - 1, 1)) }

  return (
    <div className="min-h-screen bg-[#fafaf8] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-[#e8e6e0] px-6 py-4 flex items-center justify-between">
        <span className="font-serif text-lg font-semibold text-[#1e3a5f]">ConfirmSunday</span>
        <div className="flex items-center gap-2">
          {STEPS.map((label, i) => {
            const n = i + 1
            const done = step > n
            const active = step === n
            return (
              <div key={n} className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all
                    ${done ? 'bg-[#16a34a] text-white' : active ? 'bg-[#2563eb] text-white' : 'bg-white border-2 border-[#e8e6e0] text-gray-400'}`}>
                    {done ? '✓' : n}
                  </div>
                  <span className={`text-[10px] whitespace-nowrap hidden sm:block
                    ${active ? 'text-[#2563eb] font-medium' : 'text-gray-400'}`}>
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`w-8 h-0.5 mb-4 hidden sm:block ${done ? 'bg-[#16a34a]' : 'bg-[#e8e6e0]'}`} />
                )}
              </div>
            )
          })}
        </div>
        <div className="w-32" />
      </div>

      {/* Step content */}
      <div className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-xl">
          {step === 1 && <StepWelcome onNext={next} />}
          {step === 2 && (
            <StepVolunteers
              volunteers={data.volunteers}
              onChange={volunteers => setData(d => ({ ...d, volunteers }))}
              onNext={next}
              onBack={back}
            />
          )}
          {step === 3 && (
            <StepRoles
              roles={data.roles}
              onChange={roles => setData(d => ({ ...d, roles }))}
              onNext={next}
              onBack={back}
            />
          )}
          {step === 4 && (
            <StepAssign
              volunteers={data.volunteers}
              roles={data.roles}
              assignments={data.assignments}
              onChange={assignments => setData(d => ({ ...d, assignments }))}
              onNext={next}
              onBack={back}
            />
          )}
          {step === 5 && (
            <StepSchedule
              schedule={data.schedule}
              onChange={schedule => setData(d => ({ ...d, schedule }))}
              onBack={back}
            />
          )}
        </div>
      </div>
    </div>
  )
}
