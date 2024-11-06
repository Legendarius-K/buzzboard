// components/CommentItem.tsx

import { User } from "lucide-react";
import { DeleteCommentButton } from "./deleteCommentButton";

interface CommentItemProps {
  comment: {
    id: string;
    content: string;
    user_id: string;
    author: string;
  };
  userId: string | undefined;
  isAuthor: boolean | null;
  slug: string;
}

export const CommentItem = ({
  comment,
  userId,
  isAuthor,
  slug,
}: CommentItemProps) => {
  const canDelete = userId === comment.user_id || isAuthor;

  return (
    <div className="bg-bgdark p-4 pb-1 rounded-lg my-3 flex flex-col items-center">
      <div className="bg-neutral-100 text-black p-2 rounded-md w-full ">
        {comment.content}
      </div>
      <div className="w-full flex justify-between pt-1">
        <div className="flex items-center gap-1 text-sm">
          <User size={16} />
          {comment.author}
        </div>
        {canDelete && (
          <DeleteCommentButton commentId={comment.id} slug={slug} />
        )}
      </div>
    </div>
  );
};
