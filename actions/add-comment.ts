'use server'
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server"

export const addComment = async (formData: FormData) => {
    const supabase = createClient()
    const data = {
      comment: formData.get("comment") as string,
      postId: formData.get("postId") as string,
    };

    console.log(data.postId);

    const {data: post} = await supabase
    .from('posts')
    .select('user_id, title, slug')
    .eq('id', data.postId)
    .single()

    console.log('user id ' + post?.user_id);

    const {} = await supabase
    .from('comments')
    .insert([{content: data.comment, post_id: data.postId, user_id: post?.user_id}])

    redirect(`/single-post/${post?.slug}`)
    
}