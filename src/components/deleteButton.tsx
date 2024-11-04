'use client'

import { Loader, Trash2 } from "lucide-react";
import { deletePost } from "../../actions/delete-post";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";


export const DeleteButton = ({ postId }: { postId: string }) => {
    const { mutate, isPending } = useMutation({
        mutationFn: () => deletePost(postId), 
        onError: (error) => toast(error.message),
        onSuccess: () => toast.success('Post deleted'),
        onMutate: () => toast.loading('Deleting post...'),
        onSettled: () => toast.dismiss()
    })
    return (
      <div onClick={() => mutate()}>
        {isPending ? (
          <Loader size={20} className="animate-spin-slow" />
        ) : (
          <Trash2
            className="transition-all cursor-pointer text-neutral-200 hover:text-red-600"
            size={20}
          />
        )}
      </div>
    );
};

