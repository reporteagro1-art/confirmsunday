'use client'

import { useState } from 'react'

type DrawerRole = { id: string; name: string; slots: number }

const INITIAL: DrawerRole[] = [
  { id: '1', name: 'Greeter', slots: 2 },
  { id: '2', name: 'Sound Tech', slots: 1 },
  { id: '3', name: 'Kids Ministry', slots: 3 },
  { id: '4', name: 'Parking', slots: 2 },
]

interface Props {
  open: boolean
  onClose: () => void
  onSave: () => void
}

export default function EditRolesDrawer({ open, onClose, onSave }: Props) {
  const [roles, setRoles] = useState<DrawerRole[]>(INITIAL)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newName, setNewName] = useState('')
  const [newSlots, setNewSlots] = useState(1)
  let nextId = 10

  function changeSlots(id: string, dir: number) {
    setRoles(rs => rs.map(r => r.id === id ? { ...r, slots: Math.max(1, r.slots + dir) } : r))
  }

  function remove(id: string) {
    setRoles(rs => rs.filter(r => r.id !== id))
  }

  function addRole() {
    if (!newName.trim()) return
    setRoles(rs => [...rs, { id: String(nextId++), name: newName.trim(), slots: newSlots }])
    setNewName('')
    setNewSlots(1)
  }

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-[#1e3a5f]/20 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 bottom-0 w-[380px] bg-white border-l border-[#e8e6e0] z-50 flex flex-col transition-transform duration-250 ease-out
        ${open ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Header */}
        <div className="px-5 py-4 border-b border-[#e8e6e0] flex items-center justify-between flex-shrink-0">
          <h2 className="font-serif text-xl text-[#1e3a5f]">Edit roles</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl leading-none">&times;</button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <p className="text-sm text-gray-400 mb-4">Changes take effect from your next confirmation cycle.</p>

          <div className="flex flex-col gap-2 mb-4">
            {roles.map(role => (
              <div key={role.id} className="bg-[#fafaf8] border border-[#e8e6e0] rounded-xl overflow-hidden">
                {/* View row */}
                <div className="flex items-center gap-3 px-4 py-3">
                  <div className="flex-1">
                    <div className="text-base font-medium">{role.name}</div>
                    <div className="text-sm text-gray-400">{role.slots} slot{role.slots !== 1 ? 's' : ''}</div>
                  </div>
                  <button
                    onClick={() => setEditingId(editingId === role.id ? null : role.id)}
                    className="text-[#2563eb] text-sm font-medium hover:underline"
                  >
                    {editingId === role.id ? 'Cancel' : 'Edit'}
                  </button>
                  <button onClick={() => remove(role.id)} className="text-red-400 hover:text-red-600 text-xl leading-none">×</button>
                </div>

                {/* Edit row */}
                {editingId === role.id && (
                  <div className="px-4 pb-4 border-t border-[#e8e6e0] pt-3">
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role name</label>
                      <input
                        defaultValue={role.name}
                        onChange={e => setRoles(rs => rs.map(r => r.id === role.id ? { ...r, name: e.target.value } : r))}
                        className="w-full px-3 py-2 border border-[#e8e6e0] rounded-lg text-base bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Slots needed</label>
                      <div className="flex items-center gap-2">
                        <button onClick={() => changeSlots(role.id, -1)} className="w-8 h-8 border border-[#e8e6e0] rounded-lg flex items-center justify-center text-gray-600 hover:border-gray-400">−</button>
                        <span className="text-base font-medium w-6 text-center">{role.slots}</span>
                        <button onClick={() => changeSlots(role.id, 1)} className="w-8 h-8 border border-[#e8e6e0] rounded-lg flex items-center justify-center text-gray-600 hover:border-gray-400">+</button>
                      </div>
                    </div>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors"
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Add new role */}
          <div className="border border-dashed border-[#e8e6e0] rounded-xl p-4">
            <p className="text-sm font-medium text-gray-500 mb-3">Add a new role</p>
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <input
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addRole()}
                  placeholder="e.g. Worship Team"
                  className="w-full px-3 py-2.5 border border-[#e8e6e0] rounded-lg text-base bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] placeholder-gray-300"
                />
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs text-gray-400">Slots</span>
                <div className="flex items-center gap-1 border border-[#e8e6e0] rounded-lg px-2 py-2 bg-white">
                  <button onClick={() => setNewSlots(s => Math.max(1, s - 1))} className="text-gray-500 w-5 text-center">−</button>
                  <span className="text-base font-medium w-5 text-center">{newSlots}</span>
                  <button onClick={() => setNewSlots(s => s + 1)} className="text-gray-500 w-5 text-center">+</button>
                </div>
              </div>
              <button
                onClick={addRole}
                className="bg-white border border-[#e8e6e0] hover:border-gray-400 text-gray-700 font-medium py-2.5 px-3 rounded-lg text-base transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-[#e8e6e0] flex justify-end flex-shrink-0">
          <button
            onClick={onSave}
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-2.5 px-6 rounded-lg text-base transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </>
  )
}
