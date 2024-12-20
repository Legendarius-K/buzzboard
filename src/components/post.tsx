import Link from "next/link";
import { ChevronDown, MessageSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { createClient } from "../../utils/supabase/server";

export const Post = async ({
  id,
  title,
  content,
  author,
  slug,
  date,
  category,
}: {
  id?: string;
  title: string;
  content: string;
  author: string;
  slug: string;
  date: string;
  category: string;
}) => {

  const supabase = createClient();
  const { data: comments, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", id as string);

  if (!comments) {
    console.error("Error fetching comments:", error.message);
  }

  const commentCount = comments?.length;

  const timeAgo = formatDistanceToNow(new Date(date), { addSuffix: true });

  return (
    <div className="flex flex-col items-center w-full md:w-auto relative py-2 text-neutral-100 ">
      <p className="text-neutral-100  text-[9px]">{timeAgo}</p>
      <div className="bg-bgdark transition-all p-3 pb-0 w-full md:w-[450px] rounded-xl flex flex-col items-center">
        <div className="w-full relative flex justify-between pb-1">
          <h2 className="text-sm font-medium flex gap-1">
            <User size={18} />
            {author}
          </h2>
          <h3 className="font-medium">{title}</h3>
          <Link
            href={`/category/${category}`}
            className={cn(
              "text-sm hover:text-blue-900 hover:underline font-medium",
              category === "coding" && "text-amber-500",
              category === "general" && "text-green-500",
              category === "cakes" && "text-blue-500",
              category === "carpentry" && "text-purple-500",
              category === "insects" && "text-red-500"
            )}
          >
            {category}
          </Link>
        </div>
        <div className="w-full text-sm p-1 md:p-2 bg-neutral-100 text-black rounded-lg min-h-[60px]">
          {content}
        </div>
        <Link
          className="group transition-all w-full rounded-lg flex"
          href={`/single-post/${slug}`}
        >
          <div>
            <div className="text-white text-[14px] flex items-center gap-1">
              <MessageSquare size={16} />
              {commentCount ? commentCount : "0"}
            </div>
          </div>
          <ChevronDown className=" text-gray-400 group-hover:text-neutral-100 group w-full" />
        </Link>
      </div>
    </div>
  );
};
