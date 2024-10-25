import { HomePosts } from "@/components/homePosts";
import { getHomePosts } from "../../../utils/supabase/queries";
import { createClient } from "../../../utils/supabase/server";

// export const dynamic = 'force-dynamic' // disable cache

export default async function Home() {
    const supabase = createClient();
    const { data, error } = await getHomePosts(supabase)

    return (
        <div className="">
            {error || data.length === 0 ? (
                <div>No posts found</div>
            ) : (
                <HomePosts initialPosts={data} />
            )}
        </div>
    );
}
