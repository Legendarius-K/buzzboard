import { type HomePostsType } from "../../utils/supabase/queries"; 
import { Post } from "./post";

export const HomePosts = ({ posts }: {posts: HomePostsType}) => {
    return (
        <section className="flex flex-col items-center gap-6">
            {posts?.map(({id, title, slug, content, author, date, category}) => 
                <Post id={id} title={title} slug={slug} author={author} content={content} date={date} category={category}/>
            )}
        </section>
    );
};

