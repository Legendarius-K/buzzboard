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

export const getPostsByQuery = (searchQuery: string) => {
    const supabase = createClient();
    if (searchQuery.length > 1) {
        return supabase
            .from('posts')
            .select('title, id, slug, author')
            .textSearch("title", searchQuery.replace(/ /g, '+'))
            // .ilike('title', `%${searchQuery}%`);
    }
}