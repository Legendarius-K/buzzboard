'use server'

import { redirect } from "next/navigation"
import { createClient } from "../utils/supabase/server"

export const deleteComment = async (commentId: string, slug: string) => {
    const supabase = createClient()

    const {} = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId)

    redirect(`/single-post/${slug}`)
}