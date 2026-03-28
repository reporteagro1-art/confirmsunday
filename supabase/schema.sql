-- ============================================================
-- ConfirmSunday Database Schema
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- ============================================================

-- Enable UUID extension (already enabled in Supabase by default)
create extension if not exists "uuid-ossp";

-- ============================================================
-- CHURCHES
-- One church per account (v1 — single church per coordinator)
-- ============================================================
create table if not exists churches (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  created_at  timestamptz not null default now()
);

-- ============================================================
-- COORDINATORS
-- Linked to Supabase auth.users via user_id
-- ============================================================
create table if not exists coordinators (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  church_id   uuid not null references churches(id) on delete cascade,
  name        text not null,
  email       text not null,
  phone       text,                          -- for Friday SMS summary
  plan        text not null default 'trial', -- 'trial' | 'email' | 'sms'
  trial_ends_at timestamptz default (now() + interval '14 days'),
  created_at  timestamptz not null default now(),
  unique(user_id)
);

-- ============================================================
-- VOLUNTEERS
-- People who can be assigned to roles
-- ============================================================
create table if not exists volunteers (
  id          uuid primary key default uuid_generate_v4(),
  church_id   uuid not null references churches(id) on delete cascade,
  name        text not null,
  email       text not null,
  phone       text,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

-- ============================================================
-- ROLES
-- e.g. "Sound Tech", "Worship Leader", "Greeter"
-- Each role has one primary slot per Sunday
-- ============================================================
create table if not exists roles (
  id          uuid primary key default uuid_generate_v4(),
  church_id   uuid not null references churches(id) on delete cascade,
  name        text not null,
  description text,
  active      boolean not null default true,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

-- ============================================================
-- ROLE ASSIGNMENTS
-- Which volunteer is the primary for a given role
-- ============================================================
create table if not exists role_assignments (
  id           uuid primary key default uuid_generate_v4(),
  role_id      uuid not null references roles(id) on delete cascade,
  volunteer_id uuid not null references volunteers(id) on delete cascade,
  created_at   timestamptz not null default now(),
  unique(role_id)  -- one primary volunteer per role
);

-- ============================================================
-- BACKUP LISTS
-- Ordered cascade of backup volunteers per role
-- cascade_position: 1 = first backup, 2 = second, etc.
-- ============================================================
create table if not exists backup_lists (
  id               uuid primary key default uuid_generate_v4(),
  role_id          uuid not null references roles(id) on delete cascade,
  volunteer_id     uuid not null references volunteers(id) on delete cascade,
  cascade_position integer not null,  -- 1-based ordering
  created_at       timestamptz not null default now(),
  unique(role_id, cascade_position),
  unique(role_id, volunteer_id)
);

-- ============================================================
-- SCHEDULES
-- When to send confirmation emails each week
-- (v1: Sunday-only, fixed weekly schedule)
-- ============================================================
create table if not exists schedules (
  id                uuid primary key default uuid_generate_v4(),
  church_id         uuid not null references churches(id) on delete cascade,
  send_day          text not null default 'monday',      -- day of week to send invites
  send_hour         integer not null default 10,          -- 10am local
  nudge_day         text not null default 'thursday',    -- auto-nudge day
  nudge_hour        integer not null default 10,
  summary_day       text not null default 'friday',      -- coordinator SMS summary
  summary_hour      integer not null default 19,          -- 7pm
  timezone          text not null default 'America/Chicago',
  active            boolean not null default true,
  created_at        timestamptz not null default now(),
  unique(church_id)
);

-- ============================================================
-- CONFIRMATIONS
-- One record per volunteer per Sunday, tracks the full lifecycle
-- ============================================================
create table if not exists confirmations (
  id               uuid primary key default uuid_generate_v4(),
  church_id        uuid not null references churches(id) on delete cascade,
  role_id          uuid not null references roles(id) on delete cascade,
  volunteer_id     uuid not null references volunteers(id) on delete cascade,
  sunday_date      date not null,
  status           text not null default 'pending',
  -- 'pending' | 'confirmed' | 'declined' | 'cancelled' | 'backup_needed'
  token            text not null unique default encode(gen_random_bytes(32), 'hex'),
  is_backup        boolean not null default false,   -- true if this was a backup activation
  backup_position  integer,                          -- which position in backup list (null = primary)
  confirmed_at     timestamptz,
  declined_at      timestamptz,
  cancelled_at     timestamptz,                      -- for late cancellations
  email_sent_at    timestamptz,
  nudge_sent_at    timestamptz,
  calendar_sent_at timestamptz,
  created_at       timestamptz not null default now(),
  unique(role_id, volunteer_id, sunday_date)
);

-- ============================================================
-- ROW LEVEL SECURITY
-- Coordinators can only see their own church's data
-- ============================================================

alter table churches         enable row level security;
alter table coordinators     enable row level security;
alter table volunteers       enable row level security;
alter table roles            enable row level security;
alter table role_assignments enable row level security;
alter table backup_lists     enable row level security;
alter table schedules        enable row level security;
alter table confirmations    enable row level security;

-- Helper function: get church_id for the current user
create or replace function get_my_church_id()
returns uuid
language sql
security definer
stable
as $$
  select church_id from coordinators where user_id = auth.uid() limit 1;
$$;

-- Churches: coordinator sees their own church
create policy "Coordinators see own church"
  on churches for all
  using (id = get_my_church_id());

-- Coordinators: see own record
create policy "Coordinators see own record"
  on coordinators for all
  using (user_id = auth.uid());

-- Volunteers: see own church's volunteers
create policy "Coordinators manage own volunteers"
  on volunteers for all
  using (church_id = get_my_church_id());

-- Roles
create policy "Coordinators manage own roles"
  on roles for all
  using (church_id = get_my_church_id());

-- Role assignments
create policy "Coordinators manage own role assignments"
  on role_assignments for all
  using (
    role_id in (select id from roles where church_id = get_my_church_id())
  );

-- Backup lists
create policy "Coordinators manage own backup lists"
  on backup_lists for all
  using (
    role_id in (select id from roles where church_id = get_my_church_id())
  );

-- Schedules
create policy "Coordinators manage own schedule"
  on schedules for all
  using (church_id = get_my_church_id());

-- Confirmations
create policy "Coordinators see own confirmations"
  on confirmations for all
  using (church_id = get_my_church_id());

-- Allow volunteers to read/update their own confirmation via magic link token
-- (no auth required — uses token lookup)
create policy "Public token access to confirmations"
  on confirmations for select
  using (true);

create policy "Public token update confirmations"
  on confirmations for update
  using (true);
