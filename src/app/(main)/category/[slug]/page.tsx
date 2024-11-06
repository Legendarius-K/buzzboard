import { Post } from "@/components/post";
import { createClient } from "../../../../../utils/supabase/server";

interface PostType {
  id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  date: string;
  category: string;
}

export default async function Category({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("posts")
    .select("id, title, slug, content, author, date, category")
    .eq("category", params.slug)
    .order("date", { ascending: false });

  if (!data) {
    throw new Error("No posts in this category");
  }

  return (
    <div className="flex justify-center w-full p-4 pb-10 text-neutral-100">
      {error || data.length === 0 ? (
        <div>No posts found in this category</div>
      ) : (
        <section className="flex flex-col items-center gap-6 w-full">
          <h2 className="text-center text-2xl text-neutral-100 font-mono capitalize">
            {params.slug}
          </h2>
          {data?.map(
            ({
              id,
              title,
              slug,
              content,
              author,
              date,
              category,
            }: PostType) => (
              <Post
                id={id}
                key={id}
                title={title}
                slug={slug}
                author={author}
                content={content}
                date={date}
                category={category}
              />
            )
          )}
        </section>
      )}
    </div>
  );
}
