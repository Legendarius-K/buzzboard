import { HomePosts } from "@/components/homePosts";
import { getHomePosts } from "../../utils/supabase/queries";

export default async function Home() {
    const { data, error } = await getHomePosts()


    return (
        <div className="">
            {error || data.length === 0 ? (
                <div>No posts found</div>
            ) : (
                <HomePosts posts={data} />
            )}
        </div>
    );
}
