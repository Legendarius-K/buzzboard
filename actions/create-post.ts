'use server'

import { z } from "zod"
import { slugify } from "../utils/slugify"
import { createClient } from "../utils/supabase/server"
import { createPostSchema } from "./schemas"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export const createPost = async (data: z.infer<typeof createPostSchema>) => {
    const parsedData = createPostSchema.parse(data)
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('Not authenticated')
    }

    const { data: usernameData } = await supabase
        .from('users')
        .select('username')
        .eq('id', user.id)
        .single()

    const username = usernameData?.username as string

    await supabase
        .from('posts')
        .insert([{ ...parsedData, user_id: user.id, slug: slugify(parsedData.title), author: username }])
        .throwOnError()

        revalidatePath('/')
    redirect(`/single-post/${slugify(parsedData.title)}`)
}
