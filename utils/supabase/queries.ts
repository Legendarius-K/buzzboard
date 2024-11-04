import { revalidatePath } from "next/cache";
import { createClient } from "./client";
import { QueryData } from '@supabase/supabase-js'
import { slugify } from "../slugify";

export const getHomePosts = async (supabase: ReturnType<typeof createClient>) => {
    return supabase
        .from('posts')
        .select('*')
        .order('date', { ascending: false })
}

export const getSinglePost = async (supabase: ReturnType<typeof createClient>, slug: string) => {
    return supabase
        .from("posts")
        .select('title, content, date, author, category, user_id, id')
        .eq("slug", slug)
        .single()
}

export type HomePostsType = QueryData<ReturnType<typeof getHomePosts>>

export const getPostsByQuery = (searchQuery: string) => {
    const supabase = createClient();
    // if (searchQuery.length > 1) {
    return supabase
        .from('posts')
        .select('title, id, slug, author')
        .ilike('title', `%${searchQuery}%`);
    // }
}

// export const getComments = () => {
//     const supabase = createClient();
//     return supabase
//         .from('comments')
//         .select('*')
//         .order('created_at', { ascending: false })
// }


export const getComments = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching comments:', error);
        return [];
    }

    return data;
};

// Insert a new comment into Supabase
export const addComment = async (content: string, parent_id: string | null = null) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('comments')
        .insert([{ content, parent_id }]);

    if (error) {
        console.error('Error adding comment:', error);
        return null;
    }

    // await supabase
    // .from('posts')
    // .select('title')
    // .eq()

    // revalidatePath(`/single-post/comment-test-post")}`);
    return data;

};