// Demo data — will be replaced with real Supabase queries in Step 2

export type SlotStatus = 'confirmed' | 'pending' | 'declined' | 'backup-pending'

export type Slot = {
  name: string
  status: SlotStatus
  isBackup?: boolean
  backupLabel?: string
}

export type RoleCard = {
  id: string
  name: string
  slots: Slot[]
}

export type Volunteer = {
  id: string
  initials: string
  name: string
  email: string
  role: string
  status: SlotStatus
}

export const DEMO_ROLES: RoleCard[] = [
  {
    id: 'greeter',
    name: 'Greeter',
    slots: [
      { name: 'Mark Johnson', status: 'confirmed' },
      { name: 'Sarah Williams', status: 'confirmed' },
    ],
  },
  {
    id: 'sound',
    name: 'Sound Tech',
    slots: [
      { name: 'Tom Davis', status: 'declined' },
      { name: 'James Miller', status: 'backup-pending', isBackup: true, backupLabel: 'B1' },
    ],
  },
  {
    id: 'kids',
    name: 'Kids Ministry',
    slots: [
      { name: 'Lisa Chen', status: 'confirmed' },
      { name: 'James Miller', status: 'confirmed' },
      { name: 'Rachel Brown', status: 'pending' },
    ],
  },
  {
    id: 'parking',
    name: 'Parking',
    slots: [
      { name: 'David Park', status: 'confirmed' },
      { name: 'Mike Torres', status: 'confirmed' },
    ],
  },
]

export const DEMO_VOLUNTEERS: Volunteer[] = [
  { id: '1', initials: 'MJ', name: 'Mark Johnson',   email: 'mark@gmail.com',    role: 'Greeter',       status: 'confirmed' },
  { id: '2', initials: 'SW', name: 'Sarah Williams', email: 'sarah@gmail.com',   role: 'Greeter',       status: 'confirmed' },
  { id: '3', initials: 'TD', name: 'Tom Davis',      email: 'tom@outlook.com',   role: 'Sound Tech',    status: 'declined' },
  { id: '4', initials: 'LC', name: 'Lisa Chen',      email: 'lisa@gmail.com',    role: 'Kids Ministry', status: 'confirmed' },
  { id: '5', initials: 'JM', name: 'James Miller',   email: 'james@church.com',  role: 'Kids Ministry', status: 'confirmed' },
  { id: '6', initials: 'RB', name: 'Rachel Brown',   email: 'rachel@gmail.com',  role: 'Kids Ministry', status: 'pending' },
  { id: '7', initials: 'DP', name: 'David Park',     email: 'david@gmail.com',   role: 'Parking',       status: 'confirmed' },
  { id: '8', initials: 'MT', name: 'Mike Torres',    email: 'mike@gmail.com',    role: 'Parking',       status: 'confirmed' },
]
