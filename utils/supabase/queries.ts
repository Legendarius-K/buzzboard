import { createClient } from "./client";
import { QueryData } from '@supabase/supabase-js'

export const getHomePosts = async () => {
    const supabase = createClient()
    return supabase
        .from('posts')
        .select('*')
        .order('date', { ascending: false })
}

export type HomePostsType = QueryData<ReturnType<typeof getHomePosts>>