import { HomePosts } from "@/components/homePosts";
import { getHomePosts } from "../../../utils/supabase/queries";
import { createClient } from "../../../utils/supabase/server";
import { Post } from "@/components/post";

// export const dynamic = 'force-dynamic' // disable cache

export const revalidate = 60 * 15

export default async function Home() {
    const supabase = createClient();
    const { data, error } = await getHomePosts(supabase)

    return (
        <div className="">
            {error || data.length === 0 ? (
                <div>No posts found</div>
            ) : (
                <section className="flex flex-col items-center gap-6">
                    {data?.map(({ id, title, slug, content, author, date, category }) =>
                        <Post key={id} title={title} slug={slug} author={author} content={content} date={date} category={category} />
                    )}
                </section>
            )}
        </div>
    );
}