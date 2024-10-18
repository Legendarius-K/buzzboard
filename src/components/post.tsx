import Link from "next/link";
import { Database } from "../../utils/supabase/database.types";
import { ChevronDown, User } from "lucide-react";
import { cn } from "@/lib/utils";

export const Post = ({
    id,
    title,
    content,
    author,
    slug,
    date,
    category
}: {
    id?: string
    title: string
    content: string
    author: string
    slug: string
    date: string
    category: string
}) => {

    return (
        <div className="flex items-center gap-3 w-full md:w-auto relative">
            <p className="text-neutral-500 w-[70px] text-[12px]">{date.slice(2, 10)}</p>
            <div className=" bg-neutral-200  transition-all p-3 pb-0 w-full  md:w-[450px] rounded-xl flex flex-col items-center">
                <div className="w-full relative flex justify-between pb-1">
                    <h2 className=" text-sm font-medium flex gap-1"><User size={18} />{author}</h2>
                    <h3 className="font-medium">{title}</h3>
                    <Link
                        href={`/category/${category}`}
                        className={cn("text-sm hover:text-blue-900 hover:underline font-medium",
                            category === 'coding' && 'text-amber-800',
                            category === 'general' && 'text-green-800'
                        )}>{category}</Link>
                </div>
                <div className="w-full text-sm p-1 bg-neutral-50 rounded-lg h-14 overflow-hidden">
                    {content}
                </div>
                <Link className=" transition-all w-full rounded-lg" href={`/single-post/${slug}`}><ChevronDown className="group w-full" color="gray" /></Link>
            </div>
        </div>
    )
};

