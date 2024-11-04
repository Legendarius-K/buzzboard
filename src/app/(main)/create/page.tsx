'use client'

import { SubmitButton } from "@/components/button";
import { Input } from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createPostSchema } from "../../../../actions/schemas";
import { z } from "zod";
import { createPost } from "../../../../actions/create-post";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader } from "lucide-react";

export default function CreatePage() {
    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof createPostSchema>>({
        resolver: zodResolver(createPostSchema)
    })

    const { mutate, error, isPending } = useMutation({
        mutationFn: createPost,
        onError: (error) => toast.error(error.message),
        onMutate: () => toast.loading('Uploading post...'),
        onSuccess: () => toast.success('Post uploaded'),
        onSettled: () => toast.dismiss()
    })

    return (
        <main className="pt-6 md:pt-10 h-full flex justify-center">
            <div className="w-full sm:w-[600px]">
                <h2 className="font-mono font-bold text-center text-xl pb-8 md:pb-12 text-neutral-100">Create post</h2>
                <form onSubmit={handleSubmit((values) => mutate(values))} className="flex flex-col gap-4">
                    <Input {...register('title')} type="text" label="Title" name="title" required error={errors.title} />
                    {/* <BasicSelect /> */}
                    <select required {...register('category')} className="border-2 px-3 py-[9.5px] rounded-full text-neutral-500" id="category" name="category">
                        <option value="general">General</option>
                        <option value="coding">Coding</option>
                        <option value="coding">Cakes</option>
                        <option value="coding">Carpentry</option>
                        <option value="coding">Insects</option>
                    </select>
                    <textarea  required  {...register('content')} placeholder="Write your post here ..." rows={10} className="border-2 rounded-2xl p-3 bg-white" name="content" id="content"></textarea>
                    {error && <p className="text-red-700">{error.message}</p>}
                    <SubmitButton text={isPending ? <Loader className="animate-spin-slow" /> : 'Post'} />
                </form>
            </div>
        </main>
    )
}