'use client'

import { useState } from 'react'
import { Volunteer } from './SetupWizard'

interface Props {
  volunteers: Volunteer[]
  onChange: (v: Volunteer[]) => void
  onNext: () => void
  onBack: () => void
}

let idCounter = 1

function parseLines(text: string): Volunteer[] {
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      const parts = line.split(',')
      if (parts.length < 2) return null
      return {
        id: String(idCounter++),
        name: parts[0].trim(),
        email: parts.slice(1).join(',').trim(),
      }
    })
    .filter(Boolean) as Volunteer[]
}

export default function StepVolunteers({ volunteers, onChange, onNext, onBack }: Props) {
  const [list, setList] = useState<Volunteer[]>(volunteers)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [showPaste, setShowPaste] = useState(false)
  const [pasteText, setPasteText] = useState('')
  const [pasteError, setPasteError] = useState('')

  function addOne() {
    if (!name.trim()) { setError('Enter a name.'); return }
    if (!email.trim() || !email.includes('@')) { setError('Enter a valid email.'); return }
    const updated = [...list, { id: String(idCounter++), name: name.trim(), email: email.trim() }]
    setList(updated)
    onChange(updated)
    setName('')
    setEmail('')
    setError('')
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') addOne()
  }

  function remove(id: string) {
    const updated = list.filter(v => v.id !== id)
    setList(updated)
    onChange(updated)
  }

  function handlePaste() {
    const result = parseLines(pasteText)
    if (result.length === 0) {
      setPasteError('Could not read that. Try: Mark Johnson, mark@gmail.com')
      return
    }
    const updated = [...list, ...result]
    setList(updated)
    onChange(updated)
    setPasteText('')
    setPasteError('')
    setShowPaste(false)
  }

  function handleNext() {
    if (list.length === 0) {
      setError('Add at least one volunteer before continuing.')
      return
    }
    onNext()
  }

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-[#1e3a5f] mb-2">
        Add your volunteers
      </h1>
      <p className="text-gray-500 text-base mb-6 font-light">
        Add each volunteer&apos;s name and email. You can always add more later.
      </p>

      {/* Input row */}
      <div className="bg-white border border-[#e8e6e0] rounded-xl p-4 mb-4">
        <div className="flex gap-3 mb-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
            <input
              value={name}
              onChange={e => { setName(e.target.value); setError('') }}
              onKeyDown={handleKeyDown}
              placeholder="Mark Johnson"
              className="w-full px-3 py-2.5 border border-[#e8e6e0] rounded-lg text-base bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-gray-300 transition"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input
              value={email}
              onChange={e => { setEmail(e.target.value); setError('') }}
              onKeyDown={handleKeyDown}
              type="email"
              placeholder="mark@gmail.com"
              className="w-full px-3 py-2.5 border border-[#e8e6e0] rounded-lg text-base bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-gray-300 transition"
            />
          </div>
          <div className="flex flex-col justify-end">
            <button
              onClick={addOne}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-2.5 px-5 rounded-lg text-base transition-colors whitespace-nowrap"
            >
              + Add
            </button>
          </div>
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>

      {/* Volunteer list */}
      {list.length > 0 && (
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">
            {list.length} volunteer{list.length !== 1 ? 's' : ''} added
          </div>
          <div className="flex flex-col gap-1.5 max-h-56 overflow-y-auto">
            {list.map(v => (
              <div key={v.id} className="flex items-center justify-between bg-[#f5f4ef] rounded-lg px-4 py-2.5">
                <span className="text-base font-medium">{v.name}</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400">{v.email}</span>
                  <button
                    onClick={() => remove(v.id)}
                    className="text-red-400 hover:text-red-600 text-lg leading-none"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Paste option — collapsed by default */}
      <div className="mb-6">
        <button
          onClick={() => setShowPaste(p => !p)}
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          {showPaste ? '▲ Hide' : '▼ Have a list to paste in? Import all at once'}
        </button>

        {showPaste && (
          <div className="mt-3 bg-white border border-[#e8e6e0] rounded-xl p-4">
            <p className="text-sm text-gray-500 mb-2 font-light">
              One person per line: <span className="font-medium text-gray-700">Name, email</span>
            </p>
            <textarea
              value={pasteText}
              onChange={e => setPasteText(e.target.value)}
              placeholder={'Mark Johnson, mark@gmail.com\nSarah Williams, sarah@gmail.com'}
              rows={4}
              className="w-full px-3 py-2.5 border border-[#e8e6e0] rounded-lg text-base bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] font-mono resize-none placeholder-gray-300 transition mb-2"
            />
            {pasteError && <p className="text-red-600 text-sm mb-2">{pasteError}</p>}
            <button
              onClick={handlePaste}
              className="bg-white border border-[#e8e6e0] hover:border-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg text-base transition-colors"
            >
              Import list →
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="bg-white border border-[#e8e6e0] hover:border-gray-400 text-gray-700 font-medium py-3 px-6 rounded-lg text-base transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-3 px-8 rounded-lg text-base transition-colors"
        >
          Continue →
        </button>
      </div>
    </div>
  )
}
