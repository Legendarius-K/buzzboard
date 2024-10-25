import { notFound } from "next/navigation";
import { createClient } from "../../../../../utils/supabase/server";
import Link from "next/link";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import CommentComp from "@/components/comments/comment";
import { getSinglePost } from "../../../../../utils/supabase/queries";


export default async function PostPage({ params }: { params: { slug: string } }) {
    const supabase = createClient()
    const { data, error } = await getSinglePost(supabase, params.slug)

    if (!data || error) notFound();

    return (
        <div className="flex flex-col items-center gap-3 w-full md:w-auto relative">
            <p className="text-neutral-500  text-[12px]">{data?.date.slice(2, 16)}</p>
            <div className=" bg-neutral-200  transition-all p-3 md:p-6 w-full md:w-[550px] rounded-xl flex flex-col items-center">
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
                {/* <CommentComp /> */}
            </div>
        </div>
    );
};

