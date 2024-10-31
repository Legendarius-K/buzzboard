'use server'

import { z } from "zod"
import { createClient } from "../utils/supabase/server"
import { logInSchema, signUpSchema } from "./schemas"
import { redirect } from "next/navigation"

export const signUp = async (values: z.infer<typeof signUpSchema>) => {
    const supabase = createClient()
    const parsedData = signUpSchema.parse(values)

    const {
        data: { user },
        error
    } = await supabase.auth.signUp(parsedData)

    if (user && user.email) {
        await supabase.from('users').insert([{id: user.id, email: user.email, username: parsedData.username}])
    }

    redirect('/')
}