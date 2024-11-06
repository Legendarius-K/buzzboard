"use server";
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";

export const addComment = async (formData: FormData) => {
  const supabase = createClient();
  const data = {
    comment: formData.get("comment") as string,
    postId: formData.get("postId") as string,
  };

  console.log(data.postId);

  const { data: post } = await supabase
    .from("posts")
    .select("user_id, title, slug")
    .eq("id", data.postId)
    .single();

  console.log("user id " + post?.user_id);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Not logged in')
  }

  const {data: username} = await supabase
  .from('users')
  .select('username')
  .eq('id', user.id)
  .single()

  if (!username) {
    throw new Error('No user found')
  }

  const {} = await supabase
    .from("comments")
    .insert([
      { content: data.comment, post_id: data.postId, user_id: user?.id, author: username?.username },
    ]);

  redirect(`/single-post/${post?.slug}`);
};
