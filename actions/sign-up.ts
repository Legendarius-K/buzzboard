'use server'

import { createClient } from "../utils/supabase/server"

export const signUp = async (formData: FormData) => {
    const data = {
        email: formData.get('email') as string,
        username: formData.get('username') as string,
        password: formData.get('password') as string
    }

    const supabase = createClient()
    const {
        data: { user },
        error
    } = await supabase.auth.signUp(data)

    if (user && user.email) {
        await supabase.from('users').insert([{id: user.id, email: user.email, username: data.username}])
    }
}