import { notFound } from "next/navigation";
import { createClient } from "../../../../../utils/supabase/server";
import Link from "next/link";
import { MessageSquare, PencilLine, User } from "lucide-react";
import { cn } from "@/lib/utils";
import CommentComp from "@/components/comments/comment";
import { getSinglePost } from "../../../../../utils/supabase/queries";
import { formatDistanceToNow } from "date-fns";
import { DeleteButton } from "@/components/deleteButton";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();
  const { data, error } = await getSinglePost(supabase, params.slug);

  if (!data || error) notFound();

  const timeAgo = formatDistanceToNow(new Date(data?.date), {
    addSuffix: true,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAuthor = user && user.id === data.user_id;
  console.log("isAuthor: ", isAuthor);

  return (
    <div className="flex flex-col items-center gap-3 w-full md:w-auto relative text-neutral-100">
      <p className="text-neutral-100  text-[12px]">{timeAgo}</p>
      <div className=" bg-bgdark  transition-all p-3 md:p-6 pb-2 md:pb-2 w-full md:w-[550px] rounded-xl flex flex-col items-center shadow-xl">
        <div className="w-full relative flex justify-between pb-1">
          <h2 className=" text-sm font-medium flex gap-1">
            <User size={18} />
            {data?.author}
          </h2>
          <h3 className="font-medium md:text-lg">{data?.title}</h3>
          <Link
            href={`/category/${data?.category}`}
            className={cn(
              "text-sm hover:text-blue-900 hover:underline font-medium",
              data?.category === "coding" && "text-amber-500",
              data?.category === "general" && "text-green-500",
              data?.category === "cakes" && "text-blue-500",
              data?.category === "carpentry" && "text-purple-500",
              data?.category === "insects" && "text-red-500"
            )}
          >
            {data?.category}
          </Link>
        </div>
        <div className="w-full text-sm p-1 md:p-2 bg-neutral-100 text-black rounded-lg min-h-[120px]">
          {data?.content}
        </div>
        <div className="w-full pt-2 flex justify-end gap-3">
          {user && (
            <MessageSquare
              size={20}
              className="text-neutral-200 hover:text-green-600 cursor-pointer"
            />
          )}
          {isAuthor && (
            <>
              <Link href={`/single-post/${params.slug}/edit`}>
                <PencilLine
                  className="text-neutral-200 hover:text-blue-400 cursor-pointer"
                  size={20}
                />
              </Link>
              <DeleteButton postId={data.id} />
            </>
          )}
        </div>
        {/* <CommentComp /> */}
      </div>
    </div>
  );
}
