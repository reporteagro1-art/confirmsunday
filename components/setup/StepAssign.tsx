'use client'

import { useState } from 'react'
import { Volunteer, Role, Assignment } from './SetupWizard'

interface Props {
  volunteers: Volunteer[]
  roles: Role[]
  assignments: Assignment[]
  onChange: (a: Assignment[]) => void
  onNext: () => void
  onBack: () => void
}

// Demo volunteers shown when none have been added yet
const DEMO_VOLUNTEERS: Volunteer[] = [
  { id: 'demo1', name: 'Mark Johnson', email: 'mark@gmail.com' },
  { id: 'demo2', name: 'Sarah Williams', email: 'sarah@gmail.com' },
  { id: 'demo3', name: 'Tom Davis', email: 'tom@outlook.com' },
  { id: 'demo4', name: 'Lisa Chen', email: 'lisa@gmail.com' },
  { id: 'demo5', name: 'James Miller', email: 'james@church.com' },
]

export default function StepAssign({ volunteers: rawVolunteers, roles, assignments: initialAssignments, onChange, onNext, onBack }: Props) {
  const volunteers = rawVolunteers.length > 0 ? rawVolunteers : DEMO_VOLUNTEERS
  const [currentRole, setCurrentRole] = useState(0)
  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    if (initialAssignments.length > 0) return initialAssignments
    return roles.map(r => ({ roleId: r.id, primaryIds: [''], backups: [{ volunteerId: '' }] }))
  })

  function getAssignment(roleId: string): Assignment {
    return assignments.find(a => a.roleId === roleId) || { roleId, primaryIds: [''], backups: [] }
  }

  function updateAssignment(roleId: string, updated: Partial<Assignment>) {
    const next = assignments.map(a =>
      a.roleId === roleId ? { ...a, ...updated } : a
    )
    if (!next.find(a => a.roleId === roleId)) {
      next.push({ roleId, primaryIds: [''], backups: [], ...updated })
    }
    setAssignments(next)
    onChange(next)
  }

  function setPrimary(roleId: string, index: number, volunteerId: string) {
    const a = getAssignment(roleId)
    const ids = [...a.primaryIds]
    ids[index] = volunteerId
    updateAssignment(roleId, { primaryIds: ids })
  }

  function setBackup(roleId: string, index: number, volunteerId: string) {
    const a = getAssignment(roleId)
    const backups = [...a.backups]
    backups[index] = { volunteerId }
    updateAssignment(roleId, { backups })
  }

  function addBackup(roleId: string) {
    const a = getAssignment(roleId)
    updateAssignment(roleId, { backups: [...a.backups, { volunteerId: '' }] })
  }

  function removeBackup(roleId: string, index: number) {
    const a = getAssignment(roleId)
    updateAssignment(roleId, { backups: a.backups.filter((_, i) => i !== index) })
  }

  const role = roles[currentRole]
  if (!role) return null
  const assignment = getAssignment(role.id)

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-[#1e3a5f] mb-2">
        Assign volunteers
      </h1>
      <p className="text-gray-500 text-sm mb-6 font-light">
        For each role, pick who serves and who to call if they can&apos;t make it.
      </p>

      {/* Role tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {roles.map((r, i) => (
          <button
            key={r.id}
            onClick={() => setCurrentRole(i)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentRole === i
                ? 'bg-[#2563eb] text-white'
                : 'bg-white border border-[#e8e6e0] text-gray-600 hover:border-gray-400'
            }`}
          >
            {r.name}
          </button>
        ))}
      </div>

      {/* Role card */}
      <div className="bg-white border border-[#e8e6e0] rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="font-semibold text-base">{role.name}</div>
            <div className="text-xs text-gray-400">{role.slots} slot{role.slots !== 1 ? 's' : ''} needed each Sunday</div>
          </div>
          <span className="bg-[#eff6ff] border border-[#bfdbfe] text-[#2563eb] text-xs px-3 py-1 rounded-full font-medium">
            {currentRole + 1} of {roles.length}
          </span>
        </div>

        {/* Primary volunteers */}
        <div className="mb-5">
          <div className="text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
            Primary volunteer{role.slots > 1 ? 's' : ''}
          </div>
          <div className="flex flex-col gap-2">
            {Array.from({ length: role.slots }).map((_, i) => (
              <select
                key={i}
                value={assignment.primaryIds[i] || ''}
                onChange={e => setPrimary(role.id, i, e.target.value)}
                className="w-full px-3 py-2.5 border border-[#e8e6e0] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
              >
                <option value="">— Select volunteer —</option>
                {volunteers.map(v => (
                  <option key={v.id} value={v.id}>{v.name}</option>
                ))}
              </select>
            ))}
          </div>
        </div>

        {/* Backup cascade */}
        <div>
          <div className="text-xs font-medium text-gray-700 mb-1 uppercase tracking-wide">
            Backup cascade
          </div>
          <p className="text-xs text-gray-400 mb-3 font-light">
            If the primary can&apos;t make it, we&apos;ll contact these people in order — automatically.
          </p>

          {assignment.backups.length === 0 ? (
            <p className="text-xs text-gray-400 italic mb-3">No backups added yet.</p>
          ) : (
            <div className="flex flex-col gap-2 mb-3">
              {assignment.backups.map((b, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-[#eff6ff] border border-[#bfdbfe] rounded-full flex items-center justify-center text-[9px] font-medium text-[#2563eb] flex-shrink-0">
                    B{i + 1}
                  </div>
                  <select
                    value={b.volunteerId}
                    onChange={e => setBackup(role.id, i, e.target.value)}
                    className="flex-1 px-3 py-2 border border-[#e8e6e0] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
                  >
                    <option value="">— Select backup —</option>
                    {volunteers.map(v => (
                      <option key={v.id} value={v.id}>{v.name}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => removeBackup(role.id, i)}
                    className="text-red-400 hover:text-red-600 text-lg"
                  >×</button>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => addBackup(role.id)}
            className="w-full border border-dashed border-[#e8e6e0] hover:border-[#2563eb] hover:text-[#2563eb] text-gray-400 text-xs py-2 rounded-lg transition-colors"
          >
            + Add backup
          </button>
        </div>
      </div>

      {/* Role navigation */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => setCurrentRole(i => Math.max(0, i - 1))}
          disabled={currentRole === 0}
          className="text-sm text-gray-400 hover:text-gray-700 disabled:opacity-30 transition-colors"
        >
          ← Previous role
        </button>
        <div className="flex gap-1.5">
          {roles.map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === currentRole ? 'bg-[#2563eb]' : 'bg-[#e8e6e0]'}`} />
          ))}
        </div>
        <button
          onClick={() => setCurrentRole(i => Math.min(roles.length - 1, i + 1))}
          disabled={currentRole === roles.length - 1}
          className="text-sm text-gray-400 hover:text-gray-700 disabled:opacity-30 transition-colors"
        >
          Next role →
        </button>
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="bg-white border border-[#e8e6e0] hover:border-gray-400 text-gray-700 font-medium py-3 px-6 rounded-lg text-sm transition-colors">
          ← Back
        </button>
        <button onClick={onNext} className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-3 px-8 rounded-lg text-sm transition-colors">
          Continue →
        </button>
      </div>
    </div>
  )
}
