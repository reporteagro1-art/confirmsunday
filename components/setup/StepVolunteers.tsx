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
  const [text, setText] = useState('')
  const [parsed, setParsed] = useState<Volunteer[]>(volunteers)
  const [error, setError] = useState('')

  function handleParse() {
    if (!text.trim()) {
      setError('Paste at least one volunteer.')
      return
    }
    const result = parseLines(text)
    if (result.length === 0) {
      setError('Could not read that format. Try: Mark Johnson, mark@gmail.com')
      return
    }
    setError('')
    setParsed(result)
    onChange(result)
  }

  function remove(id: string) {
    const updated = parsed.filter(v => v.id !== id)
    setParsed(updated)
    onChange(updated)
  }

  function handleNext() {
    if (parsed.length === 0) {
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
        Paste your volunteer list below — one person per line, name then email separated by a comma.
      </p>

      <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-lg px-4 py-3 text-sm text-[#1d4ed8] mb-4 font-light">
        Example format:<br />
        <span className="font-medium">Mark Johnson, mark@gmail.com</span><br />
        <span className="font-medium">Sarah Williams, sarah@gmail.com</span>
      </div>

      <div className="mb-3">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={'Mark Johnson, mark@gmail.com\nSarah Williams, sarah@gmail.com\nTom Davis, tom@outlook.com'}
          rows={6}
          className="w-full px-4 py-3 border border-[#e8e6e0] rounded-lg text-base bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent placeholder-gray-300 font-mono resize-none transition"
        />
      </div>

      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

      <button
        onClick={handleParse}
        className="bg-white border border-[#e8e6e0] hover:border-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg text-base transition-colors mb-6"
      >
        Parse list →
      </button>

      {parsed.length > 0 && (
        <div className="mb-6">
          <div className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">
            {parsed.length} volunteer{parsed.length !== 1 ? 's' : ''} ready
          </div>
          <div className="flex flex-col gap-1.5 max-h-52 overflow-y-auto">
            {parsed.map(v => (
              <div key={v.id} className="flex items-center justify-between bg-[#f5f4ef] rounded-lg px-3 py-2.5">
                <span className="text-base font-medium">{v.name}</span>
                <div className="flex items-center gap-3">
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
