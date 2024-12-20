'use client'
import { useQuery } from "@tanstack/react-query";
import { SearchIcon, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getPostsByQuery } from "../../utils/supabase/queries";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Search = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [showNoPosts, setShowNoPosts] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery]);

    const { data, error } = useQuery({
        queryKey: ['search', debouncedQuery],
        queryFn: async () => {
            if (searchQuery.length > 1) {
                const { data, error } = await getPostsByQuery(debouncedQuery)

                if (error) throw error
                return data
            }
        },
        enabled: () => searchQuery && searchQuery.length >= 2 ? true : false
    })
    

    useEffect(() => {
        setDebouncedQuery('')
        setSearchQuery('')
    }, [pathname])

    const clearInput = () => {
      setTimeout(() => {
        setSearchQuery('')
      }, 1000)
    }

    useEffect(() => {
        if (debouncedQuery && data?.length === 0) {
            const noPostsHandler = setTimeout(() => {
                setShowNoPosts(true);
            }, 500);

            return () => {
                clearTimeout(noPostsHandler);
            };
        } else {
            setShowNoPosts(false);
        }
    }, [debouncedQuery, data]);


    return (
      <section className="z-50 flex justify-center items-center bg-white py-1 pl-3 rounded-full">
        <label className="flex justify-center" htmlFor="search">
          <SearchIcon size={20} color="gray" />
        </label>
        <input
          value={searchQuery}
          id="search"
          className=" outline-none text-zink-500 w-0 md:w-auto focus:w-auto focus:px-2 self-end"
          placeholder="Find post..."
          type="text"
          onBlur={clearInput}
          onChange={(event) => {
            setSearchQuery(event.target.value);
          }}
        />
        {searchQuery ? (
          <X
            onClick={() => {
              setSearchQuery("");
            }}
            className="cursor-pointer text-neutral-500 hover:text-black mr-2"
            size={15}
          />
        ) : (
          <div className="w-[15px]"></div>
        )}
        {searchQuery === "" ? (
          ""
        ) : data?.length === 0 ? (
          <div className="z-40 absolute top-10 left-0 w-full flex flex-col gap-1 rounded-lg ">
            {showNoPosts && (
              <div className="bg-neutral-100 hover:bg-neutral-50 rounded-lg w-full p-2 border-2 shadow-lg">
                No posts found...
              </div>
            )}
          </div>
        ) : (
          <div className="z-40 absolute top-16 right-4 flex flex-col gap-1 rounded-lg ">
            {data?.map((post) => (
              <Link
                className="bg-neutral-100 hover:bg-neutral-50 rounded-lg  p-2 border-2 shadow-lg w-[250px]"
                key={post.id}
                href={`/single-post/${post.slug}`}
              >
                <p className="font-medium">{post.title}</p>
                <p className="font-light text-sm flex items-center gap-1">
                  <User size={14} />
                  {post.author}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    );
};

