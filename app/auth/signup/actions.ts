'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const churchName = formData.get('churchName') as string
  const coordinatorName = formData.get('coordinatorName') as string

  // 1. Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/auth/callback`,
      data: {
        coordinator_name: coordinatorName,
        church_name: churchName,
      },
    },
  })

  if (authError) {
    redirect(`/auth/signup?error=${encodeURIComponent(authError.message)}`)
  }

  if (!authData.user) {
    redirect('/auth/signup?error=signup_failed')
  }

  // 2. Insert church record
  const { data: church, error: churchError } = await supabase
    .from('churches')
    .insert({ name: churchName })
    .select()
    .single()

  if (churchError) {
    redirect(`/auth/signup?error=${encodeURIComponent(churchError.message)}`)
  }

  // 3. Insert coordinator record
  const { error: coordError } = await supabase
    .from('coordinators')
    .insert({
      user_id: authData.user.id,
      church_id: church.id,
      name: coordinatorName,
      email,
    })

  if (coordError) {
    redirect(`/auth/signup?error=${encodeURIComponent(coordError.message)}`)
  }

  redirect('/dashboard/setup')
}
