'use client'

import { useState, useRef } from 'react'
import Papa from 'papaparse'
import * as XLSX from 'xlsx'
import { Volunteer } from './SetupWizard'

interface Props {
  volunteers: Volunteer[]
  onChange: (v: Volunteer[]) => void
  onNext: () => void
  onBack: () => void
}

let idCounter = 1

function makeId() { return String(idCounter++) }

// Try to detect which columns are name and email from headers
function detectColumns(headers: string[]): { nameCol: number; emailCol: number } {
  const lower = headers.map(h => h.toLowerCase().trim())
  const nameCol = lower.findIndex(h => h.includes('name') || h.includes('first') || h.includes('volunteer'))
  const emailCol = lower.findIndex(h => h.includes('email') || h.includes('e-mail'))
  return { nameCol: nameCol >= 0 ? nameCol : 0, emailCol: emailCol >= 0 ? emailCol : 1 }
}

function parseRows(rows: string[][], headers: string[]): Volunteer[] {
  const { nameCol, emailCol } = detectColumns(headers)
  return rows
    .map(row => {
      const name = row[nameCol]?.trim()
      const email = row[emailCol]?.trim()
      if (!name || !email || !email.includes('@')) return null
      return { id: makeId(), name, email }
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
  const [importPreview, setImportPreview] = useState<Volunteer[] | null>(null)
  const [importError, setImportError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  function updateList(updated: Volunteer[]) {
    setList(updated)
    onChange(updated)
  }

  function addOne() {
    if (!name.trim()) { setError('Enter a name.'); return }
    if (!email.trim() || !email.includes('@')) { setError('Enter a valid email.'); return }
    updateList([...list, { id: makeId(), name: name.trim(), email: email.trim() }])
    setName('')
    setEmail('')
    setError('')
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') addOne()
  }

  function remove(id: string) {
    updateList(list.filter(v => v.id !== id))
  }

  // ── File import ──────────────────────────────────────
  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setImportError('')

    const ext = file.name.split('.').pop()?.toLowerCase()

    if (ext === 'csv') {
      Papa.parse(file, {
        complete: (result) => {
          const rows = result.data as string[][]
          if (rows.length < 2) { setImportError('The file looks empty.'); return }
          const headers = rows[0]
          const dataRows = rows.slice(1).filter(r => r.some(c => c.trim()))
          const parsed = parseRows(dataRows, headers)
          if (parsed.length === 0) {
            setImportError("Couldn't find Name and Email columns. Make sure your file has those headers.")
            return
          }
          setImportPreview(parsed)
        },
        error: () => setImportError('Could not read that file. Try saving as CSV first.'),
      })
    } else if (ext === 'xlsx' || ext === 'xls') {
      const reader = new FileReader()
      reader.onload = (evt) => {
        try {
          const data = new Uint8Array(evt.target?.result as ArrayBuffer)
          const workbook = XLSX.read(data, { type: 'array' })
          const sheet = workbook.Sheets[workbook.SheetNames[0]]
          const rows = XLSX.utils.sheet_to_json<string[]>(sheet, { header: 1 }) as string[][]
          if (rows.length < 2) { setImportError('The spreadsheet looks empty.'); return }
          const headers = rows[0]
          const dataRows = rows.slice(1).filter(r => r.some(c => String(c ?? '').trim()))
          const parsed = parseRows(dataRows.map(r => r.map(c => String(c ?? ''))), headers.map(h => String(h ?? '')))
          if (parsed.length === 0) {
            setImportError("Couldn't find Name and Email columns. Make sure your spreadsheet has those headers.")
            return
          }
          setImportPreview(parsed)
        } catch {
          setImportError('Could not read that file. Try saving as CSV first.')
        }
      }
      reader.readAsArrayBuffer(file)
    } else {
      setImportError('Please upload a .csv, .xlsx, or .xls file.')
    }

    // Reset input so same file can be re-selected
    e.target.value = ''
  }

  function confirmImport() {
    if (!importPreview) return
    updateList([...list, ...importPreview])
    setImportPreview(null)
  }

  // ── Paste import ─────────────────────────────────────
  function handlePaste() {
    const lines = pasteText.split('\n').map(l => l.trim()).filter(Boolean)
    const parsed: Volunteer[] = lines
      .map(line => {
        const parts = line.split(',')
        if (parts.length < 2) return null
        const n = parts[0].trim()
        const em = parts.slice(1).join(',').trim()
        if (!n || !em.includes('@')) return null
        return { id: makeId(), name: n, email: em }
      })
      .filter(Boolean) as Volunteer[]

    if (parsed.length === 0) {
      setPasteError('Could not read that. Try: Mark Johnson, mark@gmail.com')
      return
    }
    updateList([...list, ...parsed])
    setPasteText('')
    setPasteError('')
    setShowPaste(false)
  }

  function handleNext() {
    if (list.length === 0) { setError('Add at least one volunteer before continuing.'); return }
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

      {/* ── Manual entry ── */}
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

      {/* ── Import from file ── */}
      <div className="mb-4">
        <input
          ref={fileRef}
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFile}
          className="hidden"
        />

        {!importPreview ? (
          <button
            onClick={() => fileRef.current?.click()}
            className="w-full flex items-center justify-center gap-2.5 bg-white border border-dashed border-[#bfdbfe] hover:border-[#2563eb] text-[#2563eb] font-medium py-3.5 rounded-xl text-base transition-colors"
          >
            <span className="text-lg">📂</span>
            Import from Excel or CSV
          </button>
        ) : (
          // Preview imported volunteers before confirming
          <div className="bg-white border border-[#bbf7d0] rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-base font-medium text-gray-900">
                Found {importPreview.length} volunteer{importPreview.length !== 1 ? 's' : ''}
              </div>
              <button onClick={() => setImportPreview(null)} className="text-gray-400 hover:text-gray-600 text-sm">Cancel</button>
            </div>
            <div className="flex flex-col gap-1.5 max-h-40 overflow-y-auto mb-4">
              {importPreview.map(v => (
                <div key={v.id} className="flex items-center justify-between bg-[#f5f4ef] rounded-lg px-3 py-2">
                  <span className="text-sm font-medium">{v.name}</span>
                  <span className="text-sm text-gray-400">{v.email}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={confirmImport}
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-2.5 px-5 rounded-lg text-base transition-colors"
              >
                Add all {importPreview.length} volunteers →
              </button>
              <button
                onClick={() => { setImportPreview(null); fileRef.current?.click() }}
                className="bg-white border border-[#e8e6e0] hover:border-gray-400 text-gray-600 font-medium py-2.5 px-4 rounded-lg text-base transition-colors"
              >
                Try another file
              </button>
            </div>
          </div>
        )}

        {importError && (
          <div className="mt-2 bg-[#fef2f2] border border-[#fecaca] rounded-lg px-4 py-3 text-sm text-[#dc2626]">
            {importError}
            <div className="text-xs text-[#dc2626]/70 mt-1">
              Make sure your file has columns named <strong>Name</strong> and <strong>Email</strong>.
            </div>
          </div>
        )}
      </div>

      {/* ── Volunteer list ── */}
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
                  <button onClick={() => remove(v.id)} className="text-red-400 hover:text-red-600 text-lg leading-none">×</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Paste option ── */}
      <div className="mb-6">
        <button
          onClick={() => setShowPaste(p => !p)}
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          {showPaste ? '▲ Hide' : '▼ Paste a list instead'}
        </button>
        {showPaste && (
          <div className="mt-3 bg-white border border-[#e8e6e0] rounded-xl p-4">
            <p className="text-sm text-gray-500 mb-2 font-light">
              One per line: <span className="font-medium text-gray-700">Name, email</span>
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
