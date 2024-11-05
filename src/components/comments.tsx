import { Trash2 } from "lucide-react";
import { addComment } from "../../actions/add-comment";
import { getSinglePost } from "../../utils/supabase/queries";
import { createClient } from "../../utils/supabase/server";
import { Input } from "./input";

export const Comments = async ({
  postId,
  slug,
}: {
  postId: string;
  slug: string;
}) => {
  const supabase = createClient();

  const { data: comments } = await supabase
    .from("comments")
    .select("content, user_id")
    .eq("post_id", postId as string)
    .order("created_at", { ascending: true });

  if (!comments) {
    throw new Error("No comments found");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthor = user && user.id === comments[0].user_id

  return (
    <>
      <div className="my-6 w-full">
        <form action={addComment} className="flex justify-evenly">
          <textarea
            className="text-black w-[60%] p-2 rounded-lg"
            placeholder="Comment..."
            rows={1}
            name="comment"
            required
          />
          <input type="hidden" name="postId" value={postId} />
          <button
            type="submit"
            className="bg-primary flex gap-2 justify-center items-center hover:bg-primaryhover text-neutral-100 font-mono font-bold py-2 rounded-full shadow-lg transition-all w-[110px]"
          >
            Post
          </button>
        </form>
      </div>
      <div className="w-full px-4 border-l-2 ml-6 md:ml-0 max-w-[550px]">
        {comments?.map((comment, index) => (
          <div key={index} className="bg-bgdark p-4 rounded-lg my-3 flex items-center">
            <div className="bg-neutral-100 text-black p-2 rounded-md w-[97%]">
              {comment.content}
            </div>
            {isAuthor ? <Trash2 className="ml-2" size={20}/> : ''}
          </div>
        ))}
      </div>
    </>
  );
};
