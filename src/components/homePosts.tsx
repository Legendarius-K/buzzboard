'use client'
import { useQuery } from "@tanstack/react-query";
import { getHomePosts, type HomePostsType } from "../../utils/supabase/queries"; 
import { Post } from "./post";
import { createClient } from "../../utils/supabase/client";

export const revalidate = 60 * 15

export const HomePosts = ({ initialPosts }: { initialPosts: HomePostsType }) => {
    const supabase = createClient()
    const { data: posts } = useQuery({
        queryKey: ['home-posts'],
        queryFn: async () => {
            const { data, error } = await getHomePosts(supabase);

            if (error) throw error
            return data
        },
        initialData: initialPosts,
        refetchOnMount: false,
        staleTime: 60000 * 5,
        refetchOnWindowFocus: true 
    })

    return (
        <section className="flex flex-col items-center gap-6">
            {posts?.map(({id, title, slug, content, author, date, category}) => 
                <Post key={id} title={title} slug={slug} author={author} content={content} date={date} category={category}/>
            )}
        </section>
    );
};

