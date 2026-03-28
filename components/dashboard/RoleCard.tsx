'use client'

import { RoleCard as RoleCardType, Slot, SlotStatus } from './data'

function slotBg(status: SlotStatus) {
  if (status === 'confirmed') return 'bg-[#f0fdf4]'
  if (status === 'pending') return 'bg-[#fffbeb]'
  if (status === 'declined') return 'bg-[#fef2f2]'
  return 'bg-[#fffbeb]' // backup-pending
}

function slotText(status: SlotStatus) {
  if (status === 'confirmed') return 'text-[#16a34a]'
  if (status === 'pending') return 'text-[#d97706]'
  if (status === 'declined') return 'text-[#dc2626]'
  return 'text-[#d97706]'
}

function slotLabel(slot: Slot) {
  if (slot.status === 'confirmed') return '✓ Confirmed'
  if (slot.status === 'pending') return '⏳ Pending'
  if (slot.status === 'declined') return '✗ Declined'
  if (slot.status === 'backup-pending') return '⏳ Backup notified'
  return ''
}

function badgeStyle(role: RoleCardType) {
  const confirmed = role.slots.filter(s => s.status === 'confirmed').length
  const total = role.slots.length

  if (confirmed === total) return { bg: 'bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0]', label: `${confirmed}/${total} confirmed` }
  if (confirmed === 0) return { bg: 'bg-[#fef2f2] text-[#dc2626] border border-[#fecaca]', label: `0/${total} confirmed` }
  return { bg: 'bg-[#fffbeb] text-[#d97706] border border-[#fde68a]', label: `${confirmed}/${total} confirmed` }
}

export default function RoleCard({ role }: { role: RoleCardType }) {
  const badge = badgeStyle(role)

  return (
    <div className="bg-white border border-[#e8e6e0] rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="font-medium text-base">{role.name}</div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badge.bg}`}>
          {badge.label}
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        {role.slots.map((slot, i) => (
          <div key={i} className={`flex items-center justify-between px-3 py-2 rounded-lg ${slotBg(slot.status)}`}>
            <span className="text-sm font-medium text-gray-800">
              {slot.name}
              {slot.isBackup && (
                <span className="ml-1.5 text-xs text-gray-400">({slot.backupLabel})</span>
              )}
            </span>
            <span className={`text-xs font-medium ${slotText(slot.status)}`}>
              {slotLabel(slot)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
