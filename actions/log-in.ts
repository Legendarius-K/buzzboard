'use server'

import { redirect } from "next/navigation"
import { createClient } from "../utils/supabase/server"
import { logInSchema } from "./schemas"
import { z } from "zod"

export const logIn = async (values: z.infer<typeof logInSchema>) => {
    const supabase = createClient()

    const parsedData = logInSchema.parse(values)

    const { error } = await supabase.auth.signInWithPassword(parsedData)

    if (error) {
        throw error
    }

    redirect('/')
}