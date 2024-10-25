'use server'

import { redirect } from "next/navigation"
import { createClient } from "../utils/supabase/server"
import { logInSchema } from "./schemas"

export const logIn = async (formData: FormData) => {
    const supabase = createClient()
    const data = {
        email: formData.get('email'),
        // username: formData.get('username'),
        password: formData.get('password')
    }

    const parsedData = logInSchema.parse(data)

    const { error } = await supabase.auth.signInWithPassword(parsedData)

    if (error) {
        throw error
    }

    redirect('/')
}