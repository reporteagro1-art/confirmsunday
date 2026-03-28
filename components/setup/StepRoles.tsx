'use client'

import { useState } from 'react'
import { Role } from './SetupWizard'

interface Props {
  roles: Role[]
  onChange: (r: Role[]) => void
  onNext: () => void
  onBack: () => void
}

let roleId = 1

const SUGGESTIONS = ['Greeter', 'Sound Tech', 'Kids Ministry', 'Worship Team', 'Parking', 'Usher']

export default function StepRoles({ roles: initialRoles, onChange, onNext, onBack }: Props) {
  const [roles, setRoles] = useState<Role[]>(
    initialRoles.length > 0 ? initialRoles : [
      { id: 'r1', name: 'Greeter', slots: 2 },
      { id: 'r2', name: 'Sound Tech', slots: 1 },
      { id: 'r3', name: 'Kids Ministry', slots: 3 },
    ]
  )
  const [newName, setNewName] = useState('')
  const [newSlots, setNewSlots] = useState(1)
  const [error, setError] = useState('')

  function update(updated: Role[]) {
    setRoles(updated)
    onChange(updated)
  }

  function addRole() {
    if (!newName.trim()) { setError('Enter a role name.'); return }
    const role: Role = { id: `r${roleId++}`, name: newName.trim(), slots: newSlots }
    const updated = [...roles, role]
    update(updated)
    setNewName('')
    setNewSlots(1)
    setError('')
  }

  function addSuggestion(name: string) {
    if (roles.find(r => r.name === name)) return
    const role: Role = { id: `r${roleId++}`, name, slots: 1 }
    update([...roles, role])
  }

  function remove(id: string) { update(roles.filter(r => r.id !== id)) }

  function changeSlots(id: string, dir: number) {
    update(roles.map(r => r.id === id ? { ...r, slots: Math.max(1, r.slots + dir) } : r))
  }

  function handleNext() {
    if (roles.length === 0) { setError('Add at least one role.'); return }
    onNext()
  }

  const suggestions = SUGGESTIONS.filter(s => !roles.find(r => r.name === s))

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-[#1e3a5f] mb-2">
        Define your roles
      </h1>
      <p className="text-gray-500 text-base mb-6 font-light">
        What volunteer positions do you fill each Sunday? Add as many as you need.
      </p>

      <div className="flex flex-col gap-2 mb-5">
        {roles.map(role => (
          <div key={role.id} className="bg-white border border-[#e8e6e0] rounded-xl px-4 py-3.5 flex items-center gap-3">
            <div className="flex-1 font-medium text-base">{role.name}</div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400 mr-1">Slots:</span>
              <button
                onClick={() => changeSlots(role.id, -1)}
                className="w-8 h-8 border border-[#e8e6e0] rounded-md bg-white text-gray-600 hover:border-gray-400 flex items-center justify-center text-base"
              >−</button>
              <span className="text-base font-medium w-5 text-center">{role.slots}</span>
              <button
                onClick={() => changeSlots(role.id, 1)}
                className="w-8 h-8 border border-[#e8e6e0] rounded-md bg-white text-gray-600 hover:border-gray-400 flex items-center justify-center text-base"
              >+</button>
            </div>
            <button
              onClick={() => remove(role.id)}
              className="text-red-400 hover:text-red-600 text-xl leading-none ml-2"
            >×</button>
          </div>
        ))}
      </div>

      {suggestions.length > 0 && (
        <div className="mb-5">
          <p className="text-sm text-gray-400 mb-2">Quick add:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map(s => (
              <button
                key={s}
                onClick={() => addSuggestion(s)}
                className="bg-white border border-[#e8e6e0] hover:border-[#2563eb] hover:text-[#2563eb] text-gray-600 text-sm font-medium px-3 py-1.5 rounded-full transition-colors"
              >
                + {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white border border-dashed border-[#e8e6e0] rounded-xl p-4 mb-6">
        <p className="text-sm font-medium text-gray-500 mb-3">Add a custom role</p>
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <input
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addRole()}
              placeholder="e.g. Worship Team"
              className="w-full px-3 py-2.5 border border-[#e8e6e0] rounded-lg text-base bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-gray-300 transition"
            />
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs text-gray-400">Slots</span>
            <div className="flex items-center gap-1 border border-[#e8e6e0] rounded-lg px-2 py-1.5 bg-white">
              <button onClick={() => setNewSlots(s => Math.max(1, s - 1))} className="text-gray-500 w-5 text-center text-base">−</button>
              <span className="text-base font-medium w-5 text-center">{newSlots}</span>
              <button onClick={() => setNewSlots(s => s + 1)} className="text-gray-500 w-5 text-center text-base">+</button>
            </div>
          </div>
          <button
            onClick={addRole}
            className="bg-white border border-[#e8e6e0] hover:border-gray-400 text-gray-700 font-medium py-2.5 px-4 rounded-lg text-base transition-colors whitespace-nowrap"
          >
            + Add
          </button>
        </div>
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="bg-white border border-[#e8e6e0] hover:border-gray-400 text-gray-700 font-medium py-3 px-6 rounded-lg text-base transition-colors">
          ← Back
        </button>
        <button onClick={handleNext} className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-3 px-8 rounded-lg text-base transition-colors">
          Continue →
        </button>
      </div>
    </div>
  )
}
