'use server'

import { revalidatePath } from "next/cache"
import { createClient } from "../utils/supabase/server" 
import { redirect } from "next/navigation"

export const logOut = () => {
    const supabase = createClient()
    supabase.auth.signOut()

    revalidatePath('/')
    redirect('/')
}