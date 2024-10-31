import { notFound } from "next/navigation";
import { createClient } from "../../../../../utils/supabase/server";
import Link from "next/link";
import { MessageSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";
import CommentComp from "@/components/comments/comment";
import { getSinglePost } from "../../../../../utils/supabase/queries";
import { formatDistanceToNow } from "date-fns";
import { DeleteButton } from "@/components/deleteButton";


export default async function PostPage({ params }: { params: { slug: string } }) {
    const supabase = createClient()
    const { data, error } = await getSinglePost(supabase, params.slug)

    if (!data || error) notFound();

    const timeAgo = formatDistanceToNow(new Date(data?.date), { addSuffix: true });

    const { data: { user } } = await supabase.auth.getUser()
    const isAuthor = user && user.id === data.user_id
    console.log('isAuthor: ', isAuthor);

    return (
        <div className="flex flex-col items-center gap-3 w-full md:w-auto relative">
            <p className="text-neutral-500  text-[12px]">{timeAgo}</p>
            <div className=" bg-neutral-200/60  transition-all p-3 md:p-6 pb-2 md:pb-2 w-full md:w-[550px] rounded-xl flex flex-col items-center shadow-xl">
                <div className="w-full relative flex justify-between pb-1">
                    <h2 className=" text-sm font-medium flex gap-1"><User size={18} />{data?.author}</h2>
                    <h3 className="font-medium md:text-lg">{data?.title}</h3>
                    <Link
                        href={`/category/${data?.category}`}
                        className={cn("text-sm hover:text-blue-900 hover:underline font-medium",
                            data?.category === 'coding' && 'text-amber-700',
                            data?.category === 'general' && 'text-green-800'
                        )}>{data?.category}</Link>
                </div>
                <div className="w-full text-sm p-1 md:p-2 bg-neutral-50 rounded-lg">
                    {data?.content}
                </div>
                <div className="w-full pt-2 flex justify-between">
                    <MessageSquare size={20} className="text-gray-600" />
                    {isAuthor && <DeleteButton postId={data.id}/>}
                </div>
            </div>
        </div>
    );
};

