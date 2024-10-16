import { notFound } from "next/navigation";
import { createClient } from "../../../../utils/supabase/client";
import Link from "next/link";


export default async function PostPage({ params }: { params: { slug: string } }) {
    const supabase = createClient()
    const { data, error} = await supabase
    .from("posts")
    .select('title, content, date, author, category')
    .eq("slug", params.slug)
    .single()

    if (!data || error) notFound();

    return (
        <div className="flex items-center gap-3 w-full md:w-auto relative">
            <p className="text-neutral-500 w-[70px] text-[12px]">{data?.date.slice(2, 10)}</p>
            <div className=" bg-neutral-200  transition-all p-3 md:p-6 w-full md:w-[550px] rounded-xl flex flex-col items-center">
                <div className="w-full relative flex justify-between pb-1">
                    <h2 className="text-blue-800 text-sm font-medium">{data?.author}</h2>
                    <h3 className="font-medium md:text-lg">{data?.title}</h3>
                    <Link href={`/category/${data?.category}`} className="text-sm hover:text-blue-900 hover:underline">{data?.category}</Link>
                </div>
                <div className="w-full text-sm p-1 md:p-2 bg-neutral-50 rounded-lg">
                    {data?.content}
                </div>
            </div>
        </div>
    );
};

