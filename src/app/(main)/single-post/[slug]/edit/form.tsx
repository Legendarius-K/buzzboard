"use client";

import { SubmitButton } from "@/components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { createPostSchema } from "../../../../../../actions/schemas";
import { toast } from "sonner";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/input";
import { Tables } from "../../../../../../utils/supabase/database.types";
import { editPost } from "../../../../../../actions/edit-post";

export const EditPostForm = ({
  defaultValues,
  postId,
}: {
  defaultValues: Pick<Tables<"posts">, "title" | "content" | "category">;
  postId: string;
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: defaultValues.title,
      content: defaultValues.content,
      category: defaultValues.category,
    },
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: editPost,
    onError: (error) => toast.error(error.message),
    onMutate: () => toast.loading("Updating post ..."),
    onSuccess: () => toast.success("Your post was updated"),
    onSettled: () => toast.dismiss(),
  });

  return (
    <section className="flex justify-center">
      <form
        onSubmit={handleSubmit((data) => mutate({ data, postId }))}
        className="flex flex-col gap-4 w-full max-w-[600px]"
      >
        <Input
          {...register("title")}
          type="text"
          label="Title"
          name="title"
          required
          error={errors.title}
        />
        {/* <BasicSelect /> */}
        <select
          required
          {...register("category")}
          className="border-2 px-3 py-[9.5px] rounded-full text-neutral-500"
          id="category"
          name="category"
        >
          <option value="general">General</option>
          <option value="coding">Coding</option>
          <option value="cakes">Cakes</option>
          <option value="carpentry">Carpentry</option>
          <option value="insects">Insects</option>
        </select>
        <textarea
          required
          {...register("content")}
          placeholder="Write your post here ..."
          rows={10}
          className="border-2 rounded-2xl p-3 bg-white"
          name="content"
          id="content"
        ></textarea>
        {error && <p className="text-red-700">{error.message}</p>}
        <SubmitButton
          text={
            isPending ? (
              <Loader className="animate-spin-slow" />
            ) : (
              "Save changes"
            )
          }
        />
      </form>
    </section>
  );
};
